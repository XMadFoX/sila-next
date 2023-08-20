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

export default function EventMoreDropdown({
	id,
	ableToEdit,
	mod,
}: {
	id: number;
	ableToEdit: boolean;
	mod: boolean;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<MoreVertical className="ml-auto" />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Действия</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Поделиться</DropdownMenuItem>
				{ableToEdit && (
					<>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Link href={`/events/${id}/edit`}>Редактировать</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>Снять с публикации</DropdownMenuItem>
						<DropdownMenuItem>Удалить</DropdownMenuItem>
					</>
				)}
				{mod && (
					<>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Снять с публикации</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
