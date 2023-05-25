import React from 'react';
import { useDrag } from '@use-gesture/react';
import { Card } from '../card';
import Image from 'next/image';
import Slide from './Slide';
import clsx from 'clsx';

const mock = {
	preview: {
		alt: 'Random image',
		image: 'https://picsum.photos/624/330',
		badges: ['Free'],
		as: Image,
	},
	details: {
		title: 'Hellow world',
		location: {
			city: 'Aboba',
			address: 'x',
		},
		date: new Date('2023-07-31 19:00'),
		description: 'Long text',
		org: {
			name: 'Aboba',
			link: 'aboba.ru',
		},
	},
};
export function Slider({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	const ref = React.useRef<HTMLUListElement>(null);
	const bind = useDrag(
		({ swipe: [swipeX] }) => {
			if (!ref.current) return;
			if (Math.abs(swipeX) > 0) ref.current.scrollLeft -= swipeX * 600;
		},
		{ swipe: { duration: 1000, velocity: [0.1, 0.1] } }
	);

	return (
		<ul
			className={clsx(
				'flex overflow-x-scroll gap-11 max-w-[670px] snap-x snap-mandatory scroll-smooth lg:max-w-[1400px]',
				className
			)}
			{...bind()}
			ref={ref}
		>
			{children}
		</ul>
	);
}

Slider.Slide = Slide;
