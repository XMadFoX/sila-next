'use client';

import CardList from 'components/landing/CardsContainer';
import { trpc } from 'lib/trpc';
import React from 'react';
import { FullCard } from 'ui/card';

export default function page() {
	const { data } = trpc.projects.find.useQuery({ status: 'ready' });
	return (
		<CardList>
			{data?.map((i) => (
				<FullCard
					base={i.base_content}
					item={i.cooperation}
					user={i.users}
					kind="project"
					key={i.base_content.id}
				/>
			))}
		</CardList>
	);
}
