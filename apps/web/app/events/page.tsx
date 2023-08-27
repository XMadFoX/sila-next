'use client';

import CardList from 'components/landing/CardsContainer';
import React, { useEffect } from 'react';
import { Card, CardSkeleton, Heading, Slide, Slider } from 'ui';
import DatesBar from './DatesBar';
import { useStore } from '@nanostores/react';
import { $filter, today } from './filter.atom';
import { trpc } from 'lib/trpc';
import { addDays, differenceInHours } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import { getBadges } from './utils';

const dateMonth = new Intl.DateTimeFormat('ru-RU', {
	day: 'numeric',
	month: 'long',
});

export default function Events() {
	const filter = useStore($filter);

	const { data } = trpc.events.find.useQuery({
		start: filter.start,
		end: filter.end,
	});
	const { data: important, isLoading } = trpc.events.find.useQuery({
		isImportant: true,
		start: today,
	});

	const router = useRouter();
	const params = useSearchParams();
	useEffect(() => {
		router.replace(
			`/events?start=${filter.start.getTime()}&end=${addDays(
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
					<br /> на развитие культурной жизни.
				</h1>
				<p className="mt-4 text-lg md:w-1/2">
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
											badges={getBadges({
												entryType: i.events.entryType,
												isOnline: i.events.isOnline ?? false,
											})}
										/>
										<Card.Details
											date={i.events.date}
											title={i.base_content.title}
											org={{ link: '/events/by/1', name: i.users.name }}
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
							.map((_, idx) => <CardSkeleton key={idx} />)}
					{!isLoading && data?.length === 0 && 'Ничего не найдено'}
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
			</section>
		</main>
	);
}
