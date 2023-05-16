import { Meta, StoryObj } from '@storybook/react';

import { Card } from 'ui';
import { Default as DefaultPreview } from './CardPreview.stories';
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
			default: 'white',
		},
	},
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
	args: {
		children: [
			<Card.Preview {...DefaultPreview.args} />,
			<Card.Details {...DefaultDetails.args} />,
		],
	},
};

export const MaxContent: Story = {
	args: {
		children: [
			<Card.Preview {...DefaultPreview.args} />,
			<Card.Details {...MaxContentDetails.args} />,
		],
	},
};
