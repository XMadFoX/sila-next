import React from 'react';
import { AlertDialog } from '../general/AlertDialog';
import { trpc } from '../lib';
import { BaseContent } from '@sila/api/schema';
import { linkMap } from '../card';

export function PublishDialog({
	id,
	kind,
}: {
	id: number;
	kind: 'event' | 'project';
}) {
	const utils = trpc.useContext();
	const { mutate } = trpc.events.updateStatus.useMutation({
		onSuccess: () => {
			utils[linkMap[kind]].getOne.invalidate(id);
		},
	});

	return (
		<AlertDialog
			title="Отправить на модерацию?"
			description=""
			trigger={
				<button className="underline">отправить его на модерацию</button>
			}
			actionText="Да"
			actionCallback={() => {
				mutate({
					id,
					status: 'ready' as BaseContent['status'],
					kind,
				});
			}}
		/>
	);
}
