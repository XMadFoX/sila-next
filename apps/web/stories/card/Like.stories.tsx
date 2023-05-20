import type { Meta, StoryObj } from '@storybook/react';

import { LikeButton } from 'ui/card/LikeButton';

const meta: Meta<typeof LikeButton> = {
	title: 'Card/LikeButton',
	component: LikeButton,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LikeButton>;

const Wrap = ({ children }: { children: React.ReactNode }) => (
	<div className="relative w-32 h-32 bg-dark-grey">{children}</div>
);

export const Default: Story = {
	render: () => (
		<Wrap>
			<LikeButton />
		</Wrap>
	),
};

export const Liked: Story = {
	render: () => (
		<Wrap>
			<LikeButton liked />
		</Wrap>
	),
};
