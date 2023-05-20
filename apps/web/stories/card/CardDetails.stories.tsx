import type { Meta, StoryObj } from '@storybook/react';

import { Card } from 'ui';

const meta: Meta<typeof Card.Details> = {
	title: 'Card/Details',
	component: Card.Details,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'light',
		},
	},
};

export default meta;
type Story = StoryObj<typeof Card.Details>;

export const Default: Story = {
	args: {
		date: new Date('2023-01-01'),
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		location: { city: 'Online' },
		title: 'Lorem ipsum dolor sit amet',
		org: {
			name: 'Lorem ipsum',
			link: 'https://google.com',
		},
	},
};

export const MaxContent: Story = {
	args: {
		date: new Date('2123-01-01 20:00'),
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, libero eget ultricies aliquam, nisl nunc aliquet nunc, vit ae aliquam velit nunc eget nunc.Donec auctor, libero eget ultricies aliquam, nisl nunc aliquet nunc, vitae aliquam velit nunc eget nunc.Donec auctor, libero eget ultricies aliquam, nisl nunc aliquet nunc, vitae aliquam velit nunc eget nunc.Donec auctor, libero eget ultricies aliquam, nisl nunc aliquet nunc, vitae aliquam velit nunc eget nunc.Donec auctor, libero eget ultricies aliquam, nisl nunc aliquet nunc, vitae aliquam velit nunc eget nunc.Donec auctor, libero eget ultricies aliquam, nisl nunc aliquet nunc, vitae aliquam velit nunc eget nunc.',
		location: { city: 'Moscow', address: "Ulitsa Bol'shaya Lubyanka, 1к1" },
		title: 'Lorem ipsum dolor sit amet',
		org: {
			name: 'Lorem ipsum',
			link: 'https://google.com',
		},
	},
};
