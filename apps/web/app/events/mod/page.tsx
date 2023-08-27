'use client';

import CardList from 'components/landing/CardsContainer';
import { trpc } from 'lib/trpc';
import React from 'react';
import { Card } from 'ui';
import { getBadges } from '../utils';

export default function page() {
	const { data } = trpc.events.find.useQuery({ status: 'ready' });
	return (
		<CardList>
			{data?.map((i) => (
				<Card key={i.events.id} id={i.events.id}>
					<Card.Preview
						image={i.events.coverImage}
						alt=""
						badges={getBadges({
							entryType: i.events.entryType,
							isOnline: i.events.isOnline ?? false,
						})}
					/>
					<Card.Details
						date={i.events.date}
						title={i.base_content.title}
						org={{ link: '', name: i.users.name }}
						location={
							i.events.city && i.events.address
								? {
										city: i.events.city,
										address: i.events.address,
								  }
								: null
						}
						description={i.events.description}
					/>
				</Card>
			))}
		</CardList>
	);
}
