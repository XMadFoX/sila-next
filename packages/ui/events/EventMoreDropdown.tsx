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

export default function EventMoreDropdown({
	id,
	ableToEdit,
	mod,
}: {
	id: number;
	ableToEdit: boolean;
	mod: boolean;
}) {
	const [dialog, setDialog] = useState<string | null>(null);

	const { mutate: updateStatus } = trpc.events.updateStatus.useMutation();
	const { mutate: deleteEvent } = trpc.events.delete.useMutation();

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
								<button onClick={() => updateStatus({ id, status: 'draft' })}>
									Снять с публикации
								</button>
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
								<button
									onClick={() =>
										updateStatus({ id, status: 'changesRequested' })
									}
								>
									Снять с публикации
								</button>
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
