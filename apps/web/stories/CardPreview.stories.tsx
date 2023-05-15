import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';

import { Card } from 'ui';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Card.Preview> = {
	title: 'Card/Preview',
	component: Card.Preview,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
};

export default meta;
type Story = StoryObj<typeof Card.Preview>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
	args: {
		image: 'https://picsum.photos/624/330',
		big: true,
		alt: 'Random image',
		badges: ['Free', 'Online'],
		as: Image,
	},
};
