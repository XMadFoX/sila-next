'use client';

import React from 'react';
import {
	Button,
	Card,
	GradientWrapper,
	Heading,
	Slider,
	Slide,
	trpc,
	FullCard,
} from 'ui';
import { cardMock } from '../../mock';
import CardList from '../CardsContainer';
import { CardDetails } from 'ui/card/CardDetails';
import { CardPreview } from 'ui/card/CardPreview';
import { today } from 'app/events/filter.atom';

export default function EventsSection() {
	const { data: important } = trpc.events.find.useQuery({
		isImportant: true,
		start: today,
	});
	const { data: events } = trpc.events.find.useQuery({
		isImportant: false,
		start: today,
	});

	return (
		<section className="flex flex-col justify-center max-w-[1400px]">
			<h2 className="text-3xl font-bold text-center uppercase md:text-4xl md:text-start">
				Культурные{' '}
				<GradientWrapper className="text-transparent bg-clip-text bg-primary bg-[length:200%] bg-[275%]">
					мероприятия
				</GradientWrapper>
			</h2>
			{important && important.length > 0 && (
				<section className="flex flex-col justify-center">
					<Heading className="mt-9 text-xl font-medium md:text-3xl" as="h3">
						Важные события
					</Heading>
					<div className="flex mx-auto max-w-fit">
						<Slider className="mx-auto mt-8">
							{important.map((i) => (
								<Slide key={i.base_content.id}>
									<FullCard
										kind="event"
										base={i.base_content}
										item={i.events}
										user={i.users}
										key={i.base_content.id}
										big
										gradientClass="w-full min-w-max"
									/>
								</Slide>
							))}
						</Slider>
					</div>
				</section>
			)}
			<section className="flex flex-col mx-auto mt-20 w-full">
				<Heading className="inline w-full text-3xl font-medium" as="h3">
					Ближайшие события
				</Heading>
				<CardList>
					{events?.map((i) => (
						<li className="mx-auto min-w-fit" key={i.base_content.id}>
							<FullCard
								kind="event"
								base={i.base_content}
								item={i.events}
								user={i.users}
								key={i.base_content.id}
								gradientClass="h-full"
							/>
						</li>
					))}
				</CardList>
			</section>
			<Button className="mx-auto mt-9 uppercase" href="/events">
				Календарь мероприятий
			</Button>
		</section>
	);
}
