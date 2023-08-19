'use client';

import React from 'react';
import { trpc } from '../../../lib';
import { Pencil } from 'lucide-react';
import EditEvent from './edit';

export default function EventTypesList() {
	const { data } = trpc.events.types.list.useQuery();
	const [edit, setEdit] = React.useState<number | null>(null);

	return (
		<div>
			<ul className="flex flex-col gap-1 divide-y">
				{data?.map((type, idx) => (
					<li className="flex items-center py-1" key={type.id}>
						{edit !== type.id ? (
							<>
								{type.name}
								<button
									aria-label="Редактировать"
									className="inline right-0 ml-auto"
									onClick={() => setEdit(type.id)}
								>
									<Pencil className="w-5 h-5" />
								</button>
							</>
						) : (
							<EditEvent
								value={type.name}
								id={type.id}
								cancel={() => setEdit(null)}
							/>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}
