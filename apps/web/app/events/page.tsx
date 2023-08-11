'use client';

import CardList from 'components/landing/CardsContainer';
import React from 'react';
import { Card, Heading, Slide, Slider } from 'ui';
import DatesBar from './DatesBar';
import { trpc } from 'lib/trpc';

const getBadges = ({
	isFree,
	isOnline,
}: {
	isFree: boolean;
	isOnline: boolean;
}) => {
	const badges: string[] = [];
	if (isFree) badges.push('Free');
	if (isOnline) badges.push('Online');
	return badges;
};

export default function Events() {
	const { data } = trpc.events.find.useQuery();
	const { data: important } = trpc.events.find.useQuery({ isImportant: true });

	return (
		<main className="mt-16 text-black max-w-[1400px]">
			<div className="flex">
				<h1 className="w-1/2 text-2xl font-medium">
					Раздел направлен
					<br /> на развитие культурной жизни.
				</h1>
				<p className="mt-4 w-1/2 text-lg">
					Вы можете узнать о культурных мероприятиях, которые проводят члены
					сообщества онлайн или офлайн, присоединиться к заинтересовавшему вас
					культурному мероприятию, а также опубликовать информацию о своем
					мероприятии или проекте.
				</p>
			</div>
			{important && important?.length > 0 && (
				<section>
					<Heading>Важные события</Heading>
					<div className="flex mx-auto max-w-fit">
						<Slider className="mx-auto mt-8">
							{important?.map((i, idx) => (
								<Slide key={i.events.id}>
									<Card
										big
										key={i.events.id}
										id={i.events.id}
										gradientClass="w-full min-w-max"
									>
										<Card.Preview
											image={i.events.coverImage}
											alt=""
											className="max-w-min"
											big
											badges={['Free', 'Online']}
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
								</Slide>
							))}
						</Slider>
					</div>
				</section>
			)}
			<section>
				<Heading>
					События{' '}
					<span className="text-transparent bg-clip-text bg-[length:200%] bg-[100%] hover:bg-center transition-[background] duration-500 bg-primary">
						сегодня
					</span>
				</Heading>
				<DatesBar />
				<CardList>
					{data?.map((i) => {
						return (
							<Card key={i.events.id} id={i.events.id}>
								<Card.Preview
									image={i.events.coverImage}
									alt=""
									badges={getBadges({
										isFree: i.events.isFree ?? false,
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
			</section>
		</main>
	);
}
