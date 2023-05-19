'use client';
import { Controls } from './';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import React from 'react';

export function Slider({ ...props }) {
	const swiperRef = React.useRef<Swiper>(null);
	const [controlsDisabled, setControlsDisabled] = React.useState([true, false]);

	const goNext = () => {
		if (swiperRef.current && swiperRef.current.swiper) {
			swiperRef.current.swiper.slideNext();
		}
	};

	const goPrev = () => {
		if (swiperRef.current && swiperRef.current.swiper) {
			swiperRef.current.swiper.slidePrev();
		}
	};

	React.useEffect(() => {
		if (swiperRef.current && swiperRef.current.swiper) {
			swiperRef.current.swiper.on('slideChange', () => {
				setControlsDisabled([
					swiperRef.current.swiper.isBeginning,
					swiperRef.current.swiper.isEnd,
				]);
			});
		}
	}, []);

	return (
		<div className="relative">
			<Swiper ref={swiperRef} navigation {...props}>
				{props.children}
			</Swiper>
			<Controls
				onClick={goPrev}
				disabled={controlsDisabled[0]}
				className="absolute -left-6 z-10 w-12 h-12 transition-opacity duration-500 top-[164px]"
			/>
			<Controls
				onClick={goNext}
				disabled={controlsDisabled[1]}
				className="absolute -right-6 z-10 w-12 h-12 transition-opacity duration-500 top-[164px]"
				next
			/>
		</div>
	);
}
