import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';

import { Button, GradientWrapper } from 'ui';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
	title: 'General/Button',
	component: Button,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
	args: {
		intent: 'primary',
		children: 'Button',
	},
};

export const Secondary: Story = {
	args: {
		children: 'Button',
		intent: 'clear',
	},
};

export const Outlined: Story = {
	args: {
		children: 'Outline',
		intent: 'outlined',
	},
};

export const Long: Story = {
	args: {
		children: 'Button beep boop',
	},
};

export const Large: Story = {
	args: {
		size: 'lg',
		children: 'Button',
	},
};

export const Small: Story = {
	args: {
		size: 'sm',
		children: 'Button',
	},
};
