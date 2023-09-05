'use client';

import clsx from 'clsx';
import CardList from 'components/landing/CardsContainer';
import { trpc } from 'lib/trpc';
import Image from 'next/image';
import React from 'react';
import { Button, FullCard } from 'ui';

export default function Page() {
	const { data: events } = trpc.events.find.useQuery({ status: null });
	const { data: projects } = trpc.projects.find.useQuery({ status: null });
	const data = [...(events ?? []), ...(projects ?? [])].sort((a, b) => {
		return (
			new Date(b.base_content.publishedAt).getTime() -
			new Date(a.base_content.publishedAt).getTime()
		);
	});

	return (
		<div className="flex flex-col">
			{data?.length === 0 ? (
				<>
					<Image
						className="mt-14"
						src="/emoji_smiling.svg"
						alt=""
						width={60}
						height={60}
					/>
					<p className="mt-5 text-xl font-medium">
						Здесь пока ничего нет, но надеемся, что скоро появится.
					</p>
					<Publish className="mr-auto" />
				</>
			) : (
				<>
					<Publish className="ml-auto" />
					<CardList>
						{data?.map((i) => {
							if ('events' in i)
								return (
									<FullCard
										key={i.base_content.id}
										base={i.base_content}
										item={i.events}
										user={i.users}
										kind="event"
									/>
								);
							return (
								<FullCard
									key={i.base_content.id}
									base={i.base_content}
									item={i.cooperation}
									user={i.users}
									kind="project"
								/>
							);
						})}
					</CardList>
				</>
			)}
		</div>
	);
}

const Publish = ({ className }: { className?: string }) => (
	<Button className={clsx('mt-8', className)} href="/me/posts/new">
		Разместить объявление
	</Button>
);
