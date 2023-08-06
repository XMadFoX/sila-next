'use client';

import { useParams } from 'next/navigation';
import React, { Suspense } from 'react';
import { EventHeader } from 'ui/events';
import { trpc } from 'ui';
import { notFound } from 'next/navigation';
import { TRPCError } from '@trpc/server';

function isData(data: any): data is TRPCError {
	return data! instanceof TRPCError;
}

export default function EventPage() {
	const params = useParams();
	if (!params.id || typeof params.id !== 'string')
		throw new Error('No event ID provided');
	const id = parseInt(params.id);
	const { data, error } = trpc.events.getOne.useQuery(id);
	if (error?.data?.code && error.data.code === 'NOT_FOUND') notFound();
	if (error) return <div>Unknown error: {JSON.stringify(error)}</div>;
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
				address={''}
				duration={data?.duration}
			/>
			{/* org contact */}
			{/* article */}
			{/* org contacts */}
			{/* events by this publisher */}
		</section>
	);
}
