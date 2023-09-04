import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Card, Heading } from 'ui';
import CardList from '../CardsContainer';
import { cardMock } from '../../mock';
import { CardPreview } from 'ui/card/CardPreview';
import { CardDetails } from 'ui/card/CardDetails';

export default function BlogSection() {
	return (
		<section className="mt-32 max-w-[1400px]">
			<div className="flex px-2 md:px-0">
				<Heading
					className="inline text-xl font-medium md:text-3xl"
					centerOnSmall={false}
				>
					Интересное в блоге
				</Heading>
				<Link href="#" className="flex gap-3 items-center ml-auto font-medium">
					Все статьи
					<Image
						src="/icons/ArrowRight.svg"
						height={25}
						width={15}
						alt=""
						className=""
					/>
				</Link>
			</div>
			<CardList>
				{Array.from({ length: 3 }, (_, i) => (
					<li className="mx-auto min-w-fit" key={i}>
						<Card kind="event" id={1} key={i} gradientClass="h-full">
							<CardPreview {...cardMock.preview} />
							<CardDetails {...cardMock.details} />
						</Card>
					</li>
				))}
			</CardList>
		</section>
	);
}
