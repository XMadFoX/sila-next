import clsx from 'clsx';
import * as React from 'react';
import {
	gradientClassNames,
	GradientDirection,
	GradientWrapper,
} from './GradientWrapper';
import Link, { LinkProps as NextLinkProps } from 'next/link';

type SharedProps = {
	children: React.ReactNode;
	intent?: 'primary' | 'clear' | 'outlined' | 'img';
	gradientDirection?: GradientDirection;
	size?: 'sm' | 'md' | 'lg';
	bg?: string;
};

type ButtonProps = SharedProps & React.ComponentPropsWithoutRef<'button'>;
type LinkProps = SharedProps & NextLinkProps;
type ButtonOrLink = ButtonProps & LinkProps;
type ButtonOrLinkProps = ButtonOrLink & SharedProps;

export function Button(props: ButtonOrLinkProps) {
	const { gradientDirection, size, bg, intent, children, ...args } = props;
	let themed = '';

	switch (intent) {
		case 'primary':
			themed = `from-primary-a via-primary-b to-primary-c text-white ${
				gradientClassNames[props.gradientDirection || 'r']
			}`;
			break;
		case 'clear':
			themed = 'bg-white text-black';
			break;
	}

	let sizeClass = '';

	switch (props.size) {
		case 'sm':
			sizeClass = 'text-sm py-2 px-4';
			break;
		case 'md':
			sizeClass = 'text-base py-4 px-8';
			break;
		case 'lg':
			sizeClass = 'text-lg py-6 px-12';
			break;
	}

	// hacky, couldn't make ts happy with dynamic tag
	if (args.href) {
		return Wrap(
			<Link
				className={clsx('rounded-full font-medium', themed, sizeClass)}
				{...(args as LinkProps)}
			>
				{props.children}
			</Link>,
			intent === 'outlined',
			bg,
			gradientDirection
		);
	}

	return Wrap(
		<button
			className={clsx('rounded-full font-medium', themed, sizeClass)}
			{...args}
		>
			{props.children}
		</button>,
		intent === 'outlined',
		bg,
		gradientDirection
	);
}

export function Wrap(
	children: React.ReactElement,
	doWrap: boolean,
	bgColor: string | undefined = undefined,
	gradientDirection: GradientDirection | undefined = undefined
): React.ReactNode {
	if (doWrap) {
		const modified = React.cloneElement(children, {
			style: { backgroundColor: bgColor || 'grey' },
		});

		return (
			<GradientWrapper
				className="mr-2 mb-2 text-white from-primary-a to-primary-c"
				rounded="full"
				gradientDirection={gradientDirection}
			>
				{modified}
			</GradientWrapper>
		);
	}
	return children;
}

const defaultProps: Partial<ButtonOrLinkProps> = {
	intent: 'primary',
	size: 'md',
	gradientDirection: 'r',
	bg: 'grey',
};

Button.defaultProps = defaultProps;
