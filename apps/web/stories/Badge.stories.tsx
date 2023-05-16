import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from 'ui';

const meta: Meta<typeof Badge> = {
	title: 'Card/Badge',
	component: Badge,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
	args: {
		children: 'Free',
	},
};

export const WithLongText: Story = {
	args: {
		children: 'Free but longer text',
	},
};
