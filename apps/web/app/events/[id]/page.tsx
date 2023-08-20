'use client';

import { useParams } from 'next/navigation';
import React, { Suspense } from 'react';
import { EventHeader, EventMoreDropdown, PublishDialog } from 'ui/events';
import { notFound } from 'next/navigation';
import { TRPCError } from '@trpc/server';
import Blocks from 'editorjs-blocks-react-renderer';
import Link from 'next/link';
import { trpc } from 'lib/trpc';
import useSession from 'ui/useSession';

function isData(data: any): data is TRPCError {
	return data! instanceof TRPCError;
}

export default function EventPage() {
	const params = useParams();
	const { data: session } = useSession();
	if (!params?.id || typeof params.id !== 'string')
		throw new Error('No event ID provided');
	const id = parseInt(params.id);
	const { data, error, isLoading } = trpc.events.getOne.useQuery(id);
	if (error?.data?.code && error.data.code === 'NOT_FOUND') notFound();
	if (error) return <div>Unknown error: {JSON.stringify(error)}</div>;
	if (isLoading) return <div>Загрузка...</div>;
	// make sure data isn't instance off TRPCError
	if (!!isData(data) || !data) return 'unknown error';

	return (
		<section>
			{data.base.status === 'draft' && data.ableToEdit && (
				<p className="p-4 mt-4 rounded-full border border-error">
					Это черновик. Вы можете <PublishDialog id={id} /> или{' '}
					<Link className="underline" href={`/events/${id}/edit`}>
						отредактировать
					</Link>
				</p>
			)}
			<div className="flex justify-between items-center w-full">
				<h1 className="my-10 text-3xl font-medium text-black">
					{data.base.title}
				</h1>
				<EventMoreDropdown
					id={id}
					ableToEdit={data?.ableToEdit}
					mod={session?.user.roles?.includes('mod') ?? false}
				/>
			</div>
			<EventHeader
				timestamp={data.date}
				isFree={!!data.isFree}
				location={
					data.city && data.address
						? { city: data.city, address: data.address }
						: null
				}
				duration={data?.duration}
			/>
			<div className="my-10 prose">
				<Blocks data={data.text.text as any} />
			</div>
			{/* org contacts */}
			{/* events by this publisher */}
		</section>
	);
}
