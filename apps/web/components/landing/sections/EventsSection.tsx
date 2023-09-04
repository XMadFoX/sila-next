import React from 'react';
import { Button, Card, GradientWrapper, Heading, Slider, Slide } from 'ui';
import { cardMock } from '../../mock';
import CardList from '../CardsContainer';
import { CardDetails } from 'ui/card/CardDetails';
import { CardPreview } from 'ui/card/CardPreview';

export default function EventsSection() {
	return (
		<section className="flex flex-col justify-center max-w-[1400px]">
			<h2 className="text-3xl font-bold text-center uppercase md:text-4xl md:text-start">
				Культурные{' '}
				<GradientWrapper className="text-transparent bg-clip-text bg-primary bg-[length:200%] bg-[275%]">
					мероприятия
				</GradientWrapper>
			</h2>
			<section className="flex flex-col justify-center">
				<Heading className="mt-9 text-xl font-medium md:text-3xl" as="h3">
					Важные события
				</Heading>
				<div className="flex mx-auto max-w-fit">
					<Slider className="mx-auto mt-8">
						{Array.from({ length: 9 }, (_, i) => (
							<Slide key={i}>
								<Card kind="event" id={1} big gradientClass="min-w-max w-full">
									<CardPreview
										big
										className="max-w-min"
										{...cardMock.preview}
									/>
									<CardDetails {...cardMock.details} />
								</Card>
							</Slide>
						))}
					</Slider>
				</div>
			</section>
			<section className="flex flex-col mx-auto mt-20 w-auto">
				<Heading className="inline w-full text-3xl font-medium" as="h3">
					Ближайшие события
				</Heading>
				<CardList>
					{Array.from({ length: 6 }, (_, i) => (
						<li className="mx-auto min-w-fit" key={i}>
							<Card kind="event" id={1} key={i} gradientClass="h-full">
								<CardPreview {...cardMock.preview} />
								<CardDetails {...cardMock.details} />
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
