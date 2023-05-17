import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';

import { Button, Controls, GradientWrapper } from 'ui';

const meta: Meta<typeof Button> = {
	title: 'Slider/Controls',
	component: Button,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const RoundControl: Story = {
	render: () => (
		<div className="flex gap-2">
			<Controls />
			<Controls next />
		</div>
	),
};

export const RoundControlSm: Story = {
	render: () => (
		<div className="flex gap-2">
			<Controls className="w-12 h-12" />
			<Controls className="w-12 h-12" next />
		</div>
	),
};
