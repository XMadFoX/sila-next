import type { Meta, StoryObj } from '@storybook/react';

import { Card } from 'ui';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Default as DefaultCard, Small as SmallCard } from './CardFull.stories';

const meta: Meta<typeof Swiper> = {
	title: 'Slider/Full',
	component: Swiper,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
};

export default meta;
type Story = StoryObj<typeof Swiper>;

import 'swiper/css';

export const Default: Story = {
	args: {
		slidesPerView: 2,
		spaceBetween: 60,
		className: 'mx-auto max-w-[1400px]',
		children: (
			<>
				{Array.from({ length: 7 }, (_, i) => (
					<SwiperSlide>
						<Card {...(DefaultCard.args as any)} />
					</SwiperSlide>
				))}
			</>
		),
	},
};

export const SmallCards: Story = {
	args: {
		slidesPerView: 3,
		spaceBetween: 20,
		className: 'mx-auto max-w-[1400px]',
		children: (
			<>
				{Array.from({ length: 7 }, (_, i) => (
					<SwiperSlide>
						<Card {...(SmallCard.args as any)} />
					</SwiperSlide>
				))}
			</>
		),
	},
};
