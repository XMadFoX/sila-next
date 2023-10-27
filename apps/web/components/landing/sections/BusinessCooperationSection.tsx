'use client';

import React from 'react';
import { GradientWrapper, Heading, Slider, Button, Slide, FullCard } from 'ui';
import CardList from '../CardsContainer';
import { trpc } from 'lib/trpc';
import { today } from 'app/events/filter.atom';

export default function BusinessCooperationSection() {
	const { data: important } = trpc.projects.find.useQuery({
		isImportant: true,
		start: today,
	});
	const { data: projects } = trpc.projects.find.useQuery({
		isImportant: false,
		start: today,
	});

	return (
		<section className="flex flex-col justify-center mt-24 max-w-[1400px]">
			<h2 className="text-3xl font-bold uppercase md:text-4xl">
				Деловое
				<br />
				<GradientWrapper className="text-transparent bg-clip-text bg-primary bg-[length:200%] bg-[275%]">
					сотрудничество
				</GradientWrapper>
			</h2>
			<div className="px-4 md:flex md:px-0">
				<p className="mt-10 text-xl font-medium md:w-1/2 md:text-2xl">
					Мы стремимся развивать деловые связи между участниками сообщества.
				</p>
				<div className="mt-10 text-lg md:w-1/2">
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
			{important && important.length > 0 && (
				<section className="flex flex-col justify-center">
					<Heading className="mt-9 text-3xl font-medium" as="h3">
						Важные проекты
					</Heading>
					<div className="flex mx-auto max-w-fit">
						<Slider className="mx-auto mt-8">
							{important.map((i) => (
								<Slide key={i.base_content.id}>
									<FullCard
										kind="project"
										base={i.base_content}
										item={i.cooperation}
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
					Другие проекты
				</Heading>
				<CardList>
					{projects?.map((i) => (
						<li className="mx-auto min-w-fit" key={i.base_content.id}>
							<FullCard
								kind="project"
								base={i.base_content}
								item={i.cooperation}
								user={i.users}
								key={i.base_content.id}
								gradientClass="h-full"
							/>
						</li>
					))}
				</CardList>
			</section>
			<Button
				className="mx-auto mt-9 text-center uppercase w-[260px]"
				href="/projects"
			>
				Каталог проектов
			</Button>
		</section>
	);
}
