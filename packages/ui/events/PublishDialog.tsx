import React from 'react';
import { AlertDialog } from '../general/AlertDialog';
import { trpc } from '../lib';
import { Event } from '@sila/api/schema';

export function PublishDialog({ id }: { id: number }) {
	const { mutate } = trpc.events.updateStatus.useMutation({});
	return (
		<AlertDialog
			title="Опубликовать мероприятие?"
			description="Оно станет доступно публично"
			trigger={<button className="underline">опубликовать его сейчас</button>}
			actionText="Опубликовать"
			actionCallback={() => {
				mutate({
					id,
					status: 'published' as Event['status'],
				});
			}}
		/>
	);
}
