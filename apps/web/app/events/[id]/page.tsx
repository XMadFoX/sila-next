'use client';

import { useParams } from 'next/navigation';
import React, { Suspense } from 'react';
import { EventHeader } from 'ui/events';
import { notFound } from 'next/navigation';
import { TRPCError } from '@trpc/server';
import Blocks from 'editorjs-blocks-react-renderer';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { trpc } from 'lib/trpc';

function isData(data: any): data is TRPCError {
	return data! instanceof TRPCError;
}

export default function EventPage() {
	const user = useSession();
	const params = useParams();
	if (!params.id || typeof params.id !== 'string')
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
			<h1 className="my-10 text-3xl font-medium text-black">
				{data.base.title}
			</h1>
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
			{data.ableToEdit && (
				<Link className="underline text-dark-grey" href={`/events/${id}/edit`}>
					Редактировать
				</Link>
			)}
			{/* org contact */}
			{/* article */}
			<div className="my-10 prose">
				<Blocks data={data.text.text as any} />
			</div>
			{/* org contacts */}
			{/* events by this publisher */}
		</section>
	);
}
