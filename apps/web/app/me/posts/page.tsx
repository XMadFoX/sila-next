'use client';

import { getBadges } from 'app/events/utils';
import CardList from 'components/landing/CardsContainer';
import { trpc } from 'lib/trpc';
import React from 'react';
import { Button, Card } from 'ui';

export default function Page() {
	const { data } = trpc.events.find.useQuery({ status: null });
	return (
		<div className="flex flex-col">
			<Button className="mt-8 ml-auto" href="/my/posts/new">
				Разместить объявление
			</Button>
			<CardList>
				{data?.map((i) => {
					return (
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
					);
				})}
			</CardList>
		</div>
	);
}
