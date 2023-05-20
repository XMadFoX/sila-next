import type { Meta, StoryObj } from '@storybook/react';

import { Heading } from 'ui';

const meta: Meta<typeof Heading> = {
	title: 'General/Heading',
	component: (args) => <Heading {...args} />,
	tags: ['autodocs'],
	parameters: {
		backgrounds: { default: 'light' },
	},
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Primary: Story = {
	args: {
		as: 'h1',
		children: 'Hello world!',
	},
};

export const CustomClasses: Story = {
	args: {
		children: 'h2 is default',
		className: 'text-2xl font-normal text-black',
	},
};
