'use client';

import CardList from 'components/landing/CardsContainer';
import React, { Suspense, useEffect } from 'react';
import { CardSkeleton, Heading, Slide, Slider } from 'ui';
import DatesBar from '../events/DatesBar';
import { useStore } from '@nanostores/react';
import { $filter, today } from '../events/filter.atom';
import { trpc } from 'lib/trpc';
import { addDays, differenceInHours } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import { FullCard } from 'ui/card';

const dateMonth = new Intl.DateTimeFormat('ru-RU', {
	day: 'numeric',
	month: 'long',
});

const kind = 'project' as const;

function Projects() {
	const filter = useStore($filter);

	const { data } = trpc.projects.find.useQuery({
		start: filter.start,
		end: filter.end,
	});
	const { data: important, isLoading } = trpc.projects.find.useQuery({
		isImportant: true,
		start: today,
	});

	const router = useRouter();
	const params = useSearchParams();
	useEffect(() => {
		router.replace(
			`/projects?start=${filter.start.getTime()}&end=${addDays(
				filter.end,
				1
			).getTime()}`,
			{ scroll: false }
		);
	}, [router, filter]);

	useEffect(() => {
		const raw = [params?.get('start'), params?.get('end')];
		const parsed = raw.map((i) => (i ? new Date(parseInt(i)) : undefined));
		$filter.set({
			...filter,
			...(parsed[0] && { start: parsed[0] }),
			...(parsed[1] && { end: parsed[1] }),
		});
	}, []);

	return (
		<main className="mt-16 text-black max-w-[1400px]">
			<div className="flex flex-wrap px-2">
				<h1 className="text-2xl font-medium md:w-1/2">
					Раздел направлен
					<br />
					на развитие деловых связей между участниками сообщества.
				</h1>
				<div className="md:w-1/2">
					<p className="mt-4 text-lg">
						Вы сможете найти информацию о коммерческих и социальных проектах
						участников сообщества, в которых вы можете принять участие.
					</p>
					<p className="mt-4 text-lg">
						Если вы ищете партнеров или сотрудников для своего собственного
						проекта, вы можете опубликовать здесь информацию о нем.
					</p>
				</div>
			</div>
			{important && important?.length > 0 && (
				<section>
					<Heading>Важные события</Heading>
					<div className="flex mx-auto max-w-fit">
						<Slider className="mx-auto mt-8">
							{important?.map((i, idx) => (
								<Slide key={i.cooperation.id}>
									<FullCard
										kind={kind}
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
			<section>
				<Heading>
					События{' '}
					<span className="text-transparent bg-clip-text bg-[length:200%] bg-[100%] hover:bg-center transition-[background] duration-500 bg-primary">
						{new Date().setHours(0, 0, 0, 0) === filter.start.getTime()
							? 'сегодня'
							: dateMonth.format(filter.start)}
						{differenceInHours(filter.end, filter.start) >= 24 &&
							` - ${dateMonth.format(filter.end)}`}
					</span>
				</Heading>
				<DatesBar />
				<CardList>
					{isLoading &&
						Array(6)
							.fill(null)
							.map((_, idx) => <CardSkeleton key={idx} idx={idx} />)}
					{!isLoading && data?.length === 0 && 'Ничего не найдено'}
					{data?.map((i) => {
						return (
							<FullCard
								kind={kind}
								base={i.base_content}
								item={i.cooperation}
								user={i.users}
								key={i.base_content.id}
							/>
						);
					})}
				</CardList>
			</section>
		</main>
	);
}

export default function ProjectsPage() {
	return (
		<Suspense fallback="Загрузка">
			<Projects />
		</Suspense>
	);
}
