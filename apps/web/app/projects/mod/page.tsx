'use client';

import CardList from 'components/landing/CardsContainer';
import { trpc } from 'lib/trpc';
import React from 'react';
import { Card } from 'ui';
import { getBadges } from '../../events/utils';

export default function page() {
	const { data } = trpc.projects.find.useQuery({ status: 'ready' });
	return (
		<CardList>
			{data?.map((i) => (
				<Card kind="event" key={i.cooperation.id} id={i.cooperation.id}>
					<Card.Preview
						image={i.cooperation.coverImage}
						alt=""
						badges={getBadges({
							entryType: i.cooperation.entryType,
							isOnline: i.cooperation.isOnline ?? false,
						})}
					/>
					<Card.Details
						kind="event"
						date={i.cooperation.date}
						title={i.base_content.title}
						org={{ link: '', name: i.users.name }}
						location={
							i.cooperation.city && i.cooperation.address
								? {
									city: i.cooperation.city,
									address: i.cooperation.address,
								}
								: null
						}
						description={i.cooperation.description}
					/>
				</Card>
			))}
		</CardList>
	);
}
