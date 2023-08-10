import { getEvents } from '@sila/api';
import CardList from 'components/landing/CardsContainer';
import React from 'react';
import { Card, Heading, Slide, Slider } from 'ui';

export default async function Events() {
	const data = await getEvents();

	return (
		<section className="mt-16 text-black max-w-[1400px]">
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
			<section>
				<Heading>Важные события</Heading>
				<div className="flex mx-auto max-w-fit">
					<Slider className="mx-auto mt-8">
						{data?.map((i, idx) => (
							<Slide key={i.events.id}>
								<Card big key={i.events.id} gradientClass="w-full min-w-max">
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
										location={{ city: 'Aboba' }}
										description={i.events.description}
									/>
								</Card>
							</Slide>
						))}
					</Slider>
				</div>
			</section>
			<CardList>
				{data?.map((i) => {
					const badges: string[] = [];
					if (i.events?.isFree) badges.push('Free');
					if (i.events?.isOnline) badges.push('Online');

					return (
						<Card key={i.events.id}>
							<Card.Preview
								image={i.events.coverImage}
								alt=""
								badges={badges}
							/>
							<Card.Details
								date={i.events.date}
								title={i.base_content.title}
								org={{ link: '', name: i.users.name }}
								location={{ city: 'Aboba' }}
								description={i.events.description}
							/>
						</Card>
					);
				})}
			</CardList>
		</section>
	);
}
