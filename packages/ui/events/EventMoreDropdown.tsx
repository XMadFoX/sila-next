import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from '../general/';
import { MoreVertical } from 'lucide-react';
import Link from 'next/link';
import { trpc } from '../lib';
import { AlertDialog } from '../general/AlertDialog';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BaseContent } from '@sila/api/schema';

export default function EventMoreDropdown({
	id,
	status,
	ableToEdit,
	mod,
}: {
	id: number;
	status: BaseContent['status'];
	ableToEdit: boolean;
	mod: boolean;
}) {
	const [dialog, setDialog] = useState<string | null>(null);

	const router = useRouter();
	const utils = trpc.useContext();
	const refetch = () => utils.events.getOne.invalidate(id);
	const { mutate: updateStatus } = trpc.events.updateStatus.useMutation({
		onSuccess: refetch,
	});
	const { mutate: deleteEvent } = trpc.events.delete.useMutation({
		onSuccess: () => {
			refetch();
			router.push('/me');
		},
	});

	return (
		<>
			<DropdownMenu modal={true}>
				<DropdownMenuTrigger>
					<MoreVertical className="ml-auto" />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Действия</DropdownMenuLabel>
					{/* <DropdownMenuSeparator /> */}
					{/* <DropdownMenuItem>Поделиться</DropdownMenuItem> */}
					{ableToEdit && (
						<>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Link href={`/events/${id}/edit`}>Редактировать</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								{['ready', 'published'].includes(status) && (
									<button onClick={() => updateStatus({ id, status: 'draft' })}>
										{status === 'published'
											? 'Снять с публикации'
											: 'Отменить публикацию'}
									</button>
								)}
								{['changesRequested', 'draft'].includes(status) && (
									<button onClick={() => updateStatus({ id, status: 'ready' })}>
										Отправить на модерацию
									</button>
								)}
							</DropdownMenuItem>
							<DropdownMenuItem>
								<button onClick={() => setDialog('editor:delete')}>
									Удалить
								</button>
							</DropdownMenuItem>
						</>
					)}
					{mod && (
						<>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								{status === 'published' && (
									<button
										onClick={() =>
											updateStatus({ id, status: 'changesRequested' })
										}
									>
										Снять с публикации
									</button>
								)}
								{status === 'ready' && (
									<button
										onClick={() => updateStatus({ id, status: 'published' })}
									>
										Одобрить публикацию
									</button>
								)}
							</DropdownMenuItem>
						</>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
			<AlertDialog
				title="Удалить?"
				actionText="Удалить"
				description="Вы уверены что хотете безвозвратно удалить объявление?"
				actionCallback={() => deleteEvent(id)}
				open={dialog === 'editor:delete'}
				close={() => setDialog(null)}
			/>
		</>
	);
}
