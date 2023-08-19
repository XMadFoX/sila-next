'use client';

import React from 'react';
import { trpc } from '../../../lib';

export default function EventTypesList() {
	const { data } = trpc.events.types.list.useQuery();

	return (
		<div>
			<ul className="flex flex-col gap-1 divide-y">
				{data?.map((type) => (
					<li className="py-1" key={type.id}>
						{type.name}
					</li>
				))}
			</ul>
		</div>
	);
}
