'use client';

import { getBadges } from 'app/events/utils';
import clsx from 'clsx';
import CardList from 'components/landing/CardsContainer';
import { trpc } from 'lib/trpc';
import Image from 'next/image';
import React from 'react';
import { Button, Card } from 'ui';

export default function Page() {
	const { data } = trpc.events.find.useQuery({ status: null });
	return (
		<div className="flex flex-col">
			{data?.length === 0 ? (
				<>
					<Image
						className="mt-14"
						src="/emoji_smiling.svg"
						alt=""
						width={60}
						height={60}
					/>
					<p className="mt-5 text-xl font-medium">
						Здесь пока ничего нет, но надеемся, что скоро появится.
					</p>
					<Publish className="mr-auto" />
				</>
			) : (
				<>
					<Publish className="ml-auto" />
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
				</>
			)}
		</div>
	);
}

const Publish = ({ className }: { className?: string }) => (
	<Button className={clsx('mt-8', className)} href="/my/posts/new">
		Разместить объявление
	</Button>
);
