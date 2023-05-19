import type { Meta, StoryObj } from '@storybook/react';

import { Card, Slider } from 'ui';
import { SwiperSlide } from 'swiper/react';

import { Default as DefaultCard } from '../card/CardFull.stories';

import React from 'react';

const meta: Meta<typeof Slider> = {
	title: 'Slider/Full',
	component: Slider,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
};

export default meta;

type Story = StoryObj<typeof Slider>;
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
