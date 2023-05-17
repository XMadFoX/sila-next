import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';

import { Card } from 'ui';

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

export const Default: Story = {
	args: {
		image: 'https://picsum.photos/624/330',
		big: true,
		alt: 'Random image',
		badges: ['Free', 'Online'],
		as: Image,
	},
};

export const Small: Story = {
	args: {
		image: 'https://picsum.photos/377/200',
		big: false,
		alt: 'Random image',
		badges: ['Free', 'Obline'],
		as: Image,
	},
};
