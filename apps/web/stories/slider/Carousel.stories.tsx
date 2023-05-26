import type { Meta, StoryObj } from '@storybook/react';

import { Card, Slider } from 'ui';

import { Default as DefaultCard } from '../card/CardFull.stories';

import React from 'react';

const meta: Meta<typeof Slider> = {
	title: 'Slider/Full',
	component: Slider,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		width: '100%',
	},
};

export default meta;

type Story = StoryObj<typeof Slider>;
export const Default: Story = {
	args: {
		className: 'mx-auto max-w-[1400px]',
		children: (
			<>
				{Array.from({ length: 7 }, (_, i) => (
					<Slider.Slide key={i}>
						<Card gradientClass="min-w-max" {...(DefaultCard.args as any)} />
					</Slider.Slide>
				))}
			</>
		),
	},
};
