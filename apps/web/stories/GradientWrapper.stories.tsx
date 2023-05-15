import type { Meta, StoryObj } from '@storybook/react';

import { Button, GradientWrapper } from 'ui';

const meta: Meta<typeof GradientWrapper> = {
	title: 'Example/GradientWrapper',
	component: GradientWrapper,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GradientWrapper>;

export const Primary: Story = {
	args: {
		children: <Button intent="outlined">Hello</Button>,
	},
};

export const Text: Story = {
	args: {
		children: 'Gradient text',
		className: 'bg-primary bg-clip-text text-transparent',
		gradientDirection: 'r',
		as: 'p',
	},
};

export const CunstomColors: Story = {
	args: {
		children: 'Beep',
		className: 'from-white via-blue to-white py-4 px-8',
		gradientDirection: 'b',
	},
};
