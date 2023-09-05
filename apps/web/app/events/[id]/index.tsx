'use client';

import { useParams } from 'next/navigation';
import React, { Suspense } from 'react';
import {
	ContactInfo,
	EventHeader,
	EventMoreDropdown,
	PublishDialog,
} from 'ui/events';
import { notFound } from 'next/navigation';
import { TRPCError } from '@trpc/server';
import Blocks from 'editorjs-blocks-react-renderer';
import Link from 'next/link';
import { trpc } from 'lib/trpc';
import useSession from 'ui/useSession';
import { linkMap } from 'ui';

function isData(data: any): data is TRPCError {
	return data! instanceof TRPCError;
}

export default function AdPage({ kind }: { kind: 'event' | 'project' }) {
	const params = useParams();
	const { data: session } = useSession();
	if (!params?.id || typeof params.id !== 'string')
		throw new Error('No ad ID provided');
	const id = parseInt(params.id);
	const { data, error, isLoading } = trpc.events.getOne.useQuery({ id, kind });
	if (error?.data?.code && error.data.code === 'NOT_FOUND') notFound();
	if (error) return <div>Unknown error: {JSON.stringify(error)}</div>;
	if (isLoading) return <div>Загрузка...</div>;
	// make sure data isn't instance off TRPCError
	if (!!isData(data) || !data) return <p>unknown error</p>;

	return (
		<section>
			{data.base.status === 'draft' && data.ableToEdit && (
				<p className="p-4 mt-4 rounded-full border border-error">
					Это черновик. Вы можете <PublishDialog kind={kind} id={id} /> или{' '}
					<Link className="underline" href={`/${linkMap[kind]}/${id}/edit`}>
						отредактировать
					</Link>
				</p>
			)}
			<div className="flex justify-between items-center w-full">
				<h1 className="my-10 text-3xl font-medium text-black">
					{data.base.title}
				</h1>
				{(data?.ableToEdit || session?.user.roles?.includes('mod')) && (
					<EventMoreDropdown
						kind={kind}
						id={id}
						status={data.base.status}
						ableToEdit={data?.ableToEdit}
						mod={session?.user.roles?.includes('mod') ?? false}
					/>
				)}
			</div>
			<EventHeader
				timestamp={data.date}
				entryType={data.entryType}
				location={
					data.city && data.address
						? { city: data.city, address: data.address }
						: null
				}
				// duration={data?.duration}
			/>
			<div className="my-10 prose">
				<Blocks data={data.text.text as any} />
			</div>
			<ContactInfo {...data.base.contacts} />
			{/* events by this publisher */}
		</section>
	);
}
