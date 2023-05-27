'use client';

import React from 'react';
import { Button, Card, GradientWrapper, Heading, Slider } from 'ui';
import { cardMock } from '../mock';
import CardList from '../landing/CardsContainer';

export default function EventsSection() {
	return (
		<section className="flex flex-col justify-center max-w-[1400px]">
			<h2 className="text-4xl font-bold uppercase">
				Культурные{' '}
				<GradientWrapper className="text-transparent bg-clip-text bg-primary bg-[length:200%] bg-[275%]">
					мероприятия
				</GradientWrapper>
			</h2>
			<section className="flex flex-col justify-center">
				<Heading className="mt-9 text-3xl font-medium" as="h3">
					Важные события
				</Heading>
				<div className="flex mx-auto max-w-fit">
					<Slider className="mx-auto mt-8">
						{Array.from({ length: 9 }, (_, i) => (
							<Slider.Slide key={i}>
								<Card big gradientClass="min-w-max">
									<Card.Preview big {...cardMock.preview} />
									<Card.Details {...cardMock.details} />
								</Card>
							</Slider.Slide>
						))}
					</Slider>
				</div>
			</section>
			<section className="mx-auto mt-20 w-auto">
				<Heading className="inline mx-auto w-auto text-3xl font-medium" as="h3">
					Ближайшие события
				</Heading>
				<CardList>
					{Array.from({ length: 6 }, (_, i) => (
						<li className="mx-auto" key={i}>
							<Card key={i} gradientClass="h-full">
								<Card.Preview {...cardMock.preview} />
								<Card.Details {...cardMock.details} />
							</Card>
						</li>
					))}
				</CardList>
			</section>
			<Button className="mx-auto mt-9 uppercase" href="#">
				Календарь мероприятий
			</Button>
		</section>
	);
}
