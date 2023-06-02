import { Meta, StoryObj } from '@storybook/react';

import { Card } from 'ui';
import {
	Default as DefaultPreview,
	Small as SmallPreview,
} from './CardPreview.stories';
import {
	Default as DefaultDetails,
	MaxContent as MaxContentDetails,
} from './CardDetails.stories';

const meta: Meta<typeof Card> = {
	title: 'Card/Full',
	component: Card,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		backgrounds: {
			default: 'light',
		},
	},
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
	args: {
		big: true,
		children: (
			<>
				<Card.Preview
					{...(DefaultPreview.args as Required<typeof DefaultPreview.args>)}
				/>
				,
				<Card.Details {...(DefaultDetails.args as any)} />,
			</>
		),
	},
};

export const MaxContent: Story = {
	args: {
		big: true,
		children: (
			<>
				<Card.Preview {...(DefaultPreview.args as any)} />,
				<Card.Details {...(MaxContentDetails.args as any)} />,
			</>
		),
	},
};

export const Small: Story = {
	args: {
		big: false,
		children: (
			<>
				<Card.Preview {...(SmallPreview.args as any)} />,
				<Card.Details {...(DefaultDetails.args as any)} />,
			</>
		),
	},
};

export const SmallMaxContent: Story = {
	args: {
		big: false,
		children: (
			<>
				<Card.Preview {...(SmallPreview.args as any)} />,
				<Card.Details {...(MaxContentDetails.args as any)} />,
			</>
		),
	},
};
