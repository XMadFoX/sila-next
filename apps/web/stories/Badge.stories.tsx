import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from 'ui';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Badge> = {
	title: 'Card/Badge',
	component: Badge,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Badge>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
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
