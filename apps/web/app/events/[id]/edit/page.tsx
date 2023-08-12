'use client';

import { trpc } from 'lib/trpc';
import React from 'react';
import { NewEvent } from 'ui/events';
import { useParams } from 'next/navigation';

export default function Edit() {
	const { id } = useParams();
	const { data } = trpc.events.getOne.useQuery(parseInt(id));
	if (!data) return 'no data';
	const { text, base, mapData, ...rest } = data;
	const values = {
		text: text.text,
		maps_link: mapData,
		...base,
		...rest,
		time: '',
	};
	return <NewEvent id={parseInt(id)} values={values as any} />;
}
