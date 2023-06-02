import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Card, Slide, Slider } from 'ui';

import { Default as DefaultCard } from '../card/CardFull.stories';

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
					<Slide key={i}>
						<Card gradientClass="min-w-max" {...(DefaultCard.args as any)} />
					</Slide>
				))}
			</>
		),
	},
};
