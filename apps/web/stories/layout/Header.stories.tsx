import type { Meta, StoryObj } from '@storybook/react';

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
	args: {},
};

/* export const SignedIn: Story = {
	args: {},
}; */
