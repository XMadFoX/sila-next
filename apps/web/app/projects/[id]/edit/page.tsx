'use client';

import { trpc } from 'lib/trpc';
import React from 'react';
import { NewEvent } from 'ui/events';
import { useParams } from 'next/navigation';
import { DangerZone } from 'ui/events';

export default function Edit() {
	const params = useParams();
	const id = parseInt(params?.id as string);
	const { data, isLoading, isError, error } = trpc.projects.getOne.useQuery(id);
	if (isLoading) return <div>Загрузка...</div>;
	if (isError) return <div>Ошибка: {error.message}</div>;
	if (!data) return 'no data';
	if (data?.ableToEdit === false) return 'У вас нет прав на редактирование';
	const { text, base, mapData, ...rest } = data;
	const values = {
		text: text.text,
		maps_link: mapData,
		...base,
		...rest,
		time: '',
	};
	return (
		<>
			<NewEvent upd={{ id, values: values as any }} project />
			<DangerZone id={id} />
		</>
	);
}
