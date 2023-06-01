import type { Meta, StoryObj } from '@storybook/react';

import { Footer } from 'ui';

const meta: Meta<typeof Footer> = {
	title: 'Layout/Footer',
	component: Footer,
	tags: ['autodocs'],
	parameters: {
		backgrounds: { default: 'light' },
	},
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
	args: {},
};
