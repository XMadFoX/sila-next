import type { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';

import { Button, GradientWrapper } from 'ui';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
	title: 'Example/Button',
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

export const RoundControl: Story = {
	render: () => (
		<GradientWrapper
			className="w-12 h-12 from-primary-a via-primary-b to-primary-c"
			gradientDirection="br"
			rounded="full"
		>
			<Button intent="img" className="">
				<svg
					width="18"
					height="32"
					viewBox="0 0 18 32"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M14.862 31.25L0 15.625L14.862 0L17.5 2.77344L5.27601 15.625L17.5 28.4766L14.862 31.25Z"
						fill="white"
					/>
				</svg>
			</Button>
		</GradientWrapper>
	),
};
export const RoundControl2: Story = {
	render: () => (
		<Button className="" intent="img">
			<Image
				alt=""
				src="/icons/GradientRoundArrow.svg"
				width={55}
				height={55}
				unoptimized
			/>
		</Button>
	),
};
export const Test: Story = {
	render: () => (
		<svg
			width="66"
			height="66"
			viewBox="0 0 66 66"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g filter="url(#filter0_d_62_1313)">
				<circle cx="31" cy="31" r="25" fill="url(#paint0_linear_62_1313)" />
			</g>
			<path
				d="M36.862 46.25L22 30.625L36.862 15L39.5 17.7734L27.276 30.625L39.5 43.4766L36.862 46.25Z"
				fill="white"
			/>
			<defs>
				<filter
					id="filter0_d_62_1313"
					x="0"
					y="0"
					width="66"
					height="66"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dx="2" dy="2" />
					<feGaussianBlur stdDeviation="4" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.262745 0 0 0 0 0.380392 0 0 0 0 0.933333 0 0 0 0.4 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_62_1313"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_62_1313"
						result="shape"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_62_1313"
					x1="-6.5"
					y1="17.1111"
					x2="64.687"
					y2="55.3414"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#2E89DC" />
					<stop offset="0.270103" stop-color="#4361EE" />
					<stop offset="0.888854" stop-color="#FB6F92" />
				</linearGradient>
			</defs>
		</svg>
	),
};
