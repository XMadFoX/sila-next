import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';

import { Header } from 'ui';

const meta: Meta<typeof Header> = {
	title: 'Layout/Header',
	component: Header,
	tags: ['autodocs'],
	parameters: {
		backgrounds: { default: 'light' },
	},
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
	args: {
		image: Image,
		// passing of next/link is broken
		link: 'a',
	},
};

/* export const SignedIn: Story = {
	args: {},
}; */
