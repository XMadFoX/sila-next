'use client';

import CardList from 'components/landing/CardsContainer';
import { trpc } from 'lib/trpc';
import React from 'react';
import { FullCard } from 'ui/card';

export default function ModPage() {
	const { data } = trpc.events.find.useQuery({ status: 'ready' });
	return data && data?.length > 0 ? (
		<CardList>
			{data?.map((i) => (
				<FullCard
					base={i.base_content}
					item={i.events}
					user={i.users}
					kind="event"
					key={i.base_content.id}
				/>
			))}
		</CardList>
	) : (
		<p>Пока нечего проверять</p>
	);
}
