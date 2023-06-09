'use client';

import React from 'react';
import { useDrag } from '@use-gesture/react';
import clsx from 'clsx';
import { Controls } from './Controls';

export function Slider({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	const ref = React.useRef<HTMLUListElement>(null);
	const [scroll, setScroll] = React.useState(0);
	const [scrollMax, setScrollMax] = React.useState(0);

	const bind = useDrag(
		({ swipe: [swipeX] }) => {
			if (!ref.current) return;
			if (Math.abs(swipeX) > 0) changeSlide(swipeX < 0 ? 'next' : 'prev');
		},
		{ swipe: { duration: 1000, velocity: [0.1, 0.1] } }
	);

	function changeSlide(direction: 'next' | 'prev') {
		if (!ref.current) return;
		if (direction === 'next') {
			ref.current.scrollLeft += 500;
		} else {
			ref.current.scrollLeft -= 500;
		}
	}

	function getScrollLeftMax(element: HTMLUListElement) {
		return (
			Math.max(element.scrollWidth, element.offsetWidth, element.clientWidth) -
			element.clientWidth
		);
	}

	React.useEffect(() => {
		if (!ref.current) return;
		ref.current.addEventListener('scroll', () => {
			if (!ref.current) return;
			setScroll(ref.current.scrollLeft || 0);
			setScrollMax(getScrollLeftMax(ref.current));
		});
		setScrollMax(getScrollLeftMax(ref.current));
	}, []);

	return (
		<div className="relative">
			<ul
				className={clsx(
					'flex overflow-x-scroll px-2 gap-[52px] w-[90vw] snap-x snap-mandatory scroll-smooth 2xl:max-w-[1400px] hidden-scrollbar',
					className
				)}
				ref={ref}
				{...bind()}
			>
				{children}
			</ul>
			<Controls
				onClick={() => changeSlide('prev')}
				className="absolute left-0 w-12 h-12 sm:-left-6 top-[164px]"
				disabled={scroll < 100}
			/>
			<Controls
				onClick={() => changeSlide('next')}
				className="absolute right-0 w-12 h-12 sm:-right-6 top-[164px]"
				disabled={scroll > scrollMax - 300}
				next
			/>
		</div>
	);
}
