'use client';

import CardList from 'components/landing/CardsContainer';
import React, { Suspense, useEffect } from 'react';
import { CardSkeleton, Heading, Slide, Slider } from 'ui';
import DatesBar from './DatesBar';
import { useStore } from '@nanostores/react';
import { $filter, today } from './filter.atom';
import { trpc } from 'lib/trpc';
import { addDays, differenceInHours } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import { FullCard } from 'ui/card';
import useSession from 'ui/useSession';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';

const dateMonth = new Intl.DateTimeFormat('ru-RU', {
	day: 'numeric',
	month: 'long',
});

const kind = 'event' as const;

function ImportantWrapper({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<section>
			<Heading>{title}</Heading>
			<div className="flex mx-auto max-w-fit">
				<Slider className="mx-auto mt-8">{children}</Slider>
			</div>
		</section>
	);
}

function ImportantEvents() {
	const { data: important } = trpc.events.find.useQuery({
		isImportant: true,
		start: today,
	});

	if (!important || important?.length < 1) return null;
	return (
		<>
			{important.map((i) => (
				<Slide key={i.events.id}>
					<FullCard
						kind={kind}
						base={i.base_content}
						item={i.events}
						user={i.users}
						key={i.base_content.id}
						big
						gradientClass="w-full min-w-max"
					/>
				</Slide>
			))}
		</>
	);
}

function ImportantEventsSection() {
	return (
		<ImportantWrapper title="Важные события">
			<Suspense
				fallback={Array(6)
					.fill(null)
					.map((_, idx) => (
						<CardSkeleton key={idx} idx={idx} big />
					))}
			>
				<ImportantEvents />
			</Suspense>
		</ImportantWrapper>
	);
}

const HeaderText = {
	title: (
		<>
			Раздел направлен
			<br />
			на развитие культурной жизни.
		</>
	),
	text: 'Вы можете узнать о культурных мероприятиях, которые проводят члены сообщества онлайн или офлайн, присоединиться к заинтересовавшему вас культурному мероприятию, а также опубликовать информацию о своем мероприятии или проекте.',
};

function HeaderWrapper({
	title,
	text,
}: {
	title: React.ReactNode;
	text: string;
}) {
	return (
		<div className="flex flex-wrap px-2">
			<h1 className="text-2xl font-medium md:w-1/2">{title}</h1>
			<p className="mt-4 text-lg md:w-1/2">{text}</p>
		</div>
	);
}

const DateRange = ({ start, end }: { start: Date; end: Date }) => (
	<>
		{new Date().setHours(0, 0, 0, 0) === start.getTime()
			? 'сегодня'
			: dateMonth.format(start)}
		{differenceInHours(end, start) >= 24 && ` - ${dateMonth.format(end)}`}
	</>
);

function Events() {
	const filter = useStore($filter);

	const { data, isLoading } = trpc.events.find.useQuery({
		start: filter.start,
		end: filter.end,
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

	const { data: session } = useSession();

	return (
		<main className="mt-16 text-black max-w-[1400px]">
			{session?.user?.roles?.includes('mod') && (
				<Link href="/events/mod">Модерация</Link>
			)}
			{session?.user?.roles?.includes('admin') && (
				<Link className="ml-2" href="/admin/events/types">
					Типы мероприятий
				</Link>
			)}
			<HeaderWrapper {...HeaderText} />
			<ImportantEventsSection />
			<section>
				<Heading>
					События{' '}
					<span className="text-transparent bg-clip-text bg-[length:200%] bg-[100%] hover:bg-center transition-[background] duration-500 bg-primary">
						<DateRange start={filter.start} end={filter.end} />
					</span>
				</Heading>
				<DatesBar />
				<CardList>
					<AnimatePresence>
						{isLoading &&
							Array(6)
								.fill(null)
								.map((_, idx) => <CardSkeleton key={idx} idx={idx} />)}
					</AnimatePresence>
					{!isLoading && data?.length === 0 && 'Ничего не найдено'}
					{data?.map((i) => {
						return (
							<FullCard
								kind={kind}
								base={i.base_content}
								item={i.events}
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

export default function EventsPage() {
	return (
		<Suspense fallback="Загрузка">
			<Events />
		</Suspense>
	);
}
