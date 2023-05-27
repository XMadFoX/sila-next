import React from 'react';
import { GradientWrapper, Heading, Slider, Card, Button, Slide } from 'ui';
import CardList from '../landing/CardsContainer';
import { cardMock } from '../mock';

export default function BusinessCooperationSection() {
	return (
		<section className="flex flex-col justify-center mt-24 max-w-[1400px]">
			<h2 className="text-4xl font-bold uppercase">
				Деловое{' '}
				<GradientWrapper className="text-transparent bg-clip-text bg-primary bg-[length:200%] bg-[275%]">
					сотрудничество
				</GradientWrapper>
			</h2>
			<div className="flex">
				<p className="mt-10 text-2xl font-medium">
					Мы стремимся развивать деловые связи между участниками сообщества.
				</p>
				<div className="mt-10 text-lg">
					<p>
						Здесь представлена информация о коммерческих и социальных проектах
						участниках сообщества, в которых вы можете принять участие.
					</p>
					<p className="mt-5">
						Если вы ищете партнеров или сотрудников для своего собственного
						проекта, вы можете опубликовать на сайте информацию о нем.
					</p>
				</div>
			</div>
			<section className="flex flex-col justify-center">
				<Heading className="mt-9 text-3xl font-medium" as="h3">
					Важные проекты
				</Heading>
				<div className="flex mx-auto max-w-fit">
					<Slider className="mx-auto mt-8">
						{Array.from({ length: 9 }, (_, i) => (
							<Slide key={i}>
								<Card big gradientClass="min-w-max">
									<Card.Preview big {...cardMock.preview} />
									<Card.Details {...cardMock.details} />
								</Card>
							</Slide>
						))}
					</Slider>
				</div>
			</section>
			<section className="mx-auto mt-20 w-auto">
				<Heading className="inline mx-auto w-auto text-3xl font-medium" as="h3">
					Другие проекты
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
			<Button className="mx-auto mt-9 text-center uppercase w-[260px]" href="#">
				Каталог проектов
			</Button>
		</section>
	);
}
