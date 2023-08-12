'use client';

import { trpc } from 'lib/trpc';
import React from 'react';
import { NewEvent } from 'ui/events';
import { useParams } from 'next/navigation';

export default function Edit() {
	const { id } = useParams();
	const { data, isLoading, isError, error } = trpc.events.getOne.useQuery(
		parseInt(id)
	);
	if (isLoading) return <div>Загрузка...</div>;
	if (isError) return <div>Ошибка: {error.message}</div>;
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
