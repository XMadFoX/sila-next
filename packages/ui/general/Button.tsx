'use client';

import { cn, rounding, Rounding } from '../lib/utils';
import clsx from 'clsx';
import * as React from 'react';
import { EnvironmentContext, LinkProps as EnvLinkProps } from '../env';
import {
	gradientClassNames,
	GradientDirection,
	GradientWrapper,
} from './GradientWrapper';
import { cva } from 'class-variance-authority';

type SharedProps = {
	children: React.ReactNode;
	intent?: 'primary' | 'clear' | 'outlined' | 'img';
	gradientDirection?: GradientDirection;
	size?: 'sm' | 'md' | 'lg' | null;
	bg?: string;
	rounded?: Rounding;
	wrapperClassName?: string;
};

type ButtonProps = React.ComponentPropsWithoutRef<'button'>;
type LinkProps = Partial<Pick<EnvLinkProps, 'href' | 'replace'>>;
type ButtonOrLink = ButtonProps & LinkProps;
type ButtonOrLinkProps = ButtonOrLink & SharedProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonOrLinkProps>(
	(props, ref) => {
		const { Link } = React.useContext(EnvironmentContext);

		const {
			gradientDirection = 'r',
			size = 'md',
			bg = 'grey',
			intent = 'primary',
			children,
			className,
			rounded = 'full',
			...args
		} = props;
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
			case null:
				break;
			case 'sm':
				sizeClass = 'text-sm py-2 px-4';
				break;
			case 'md':
				sizeClass = 'text-base py-4 px-8';
				break;
			case 'lg':
				sizeClass = 'text-lg py-6 px-12';
				break;
			default:
				sizeClass = 'text-base py-4 px-8';
		}

		// hacky, couldn't make ts happy with dynamic tag
		if (args.href) {
			return Wrap(
				<Link
					className={clsx(
						'font-medium inline-block',
						rounding[rounded],
						themed,
						intent !== 'img' && sizeClass,
						className
					)}
					{...(args as unknown as EnvLinkProps)}
				>
					{props.children}
				</Link>,
				intent === 'outlined',
				bg,
				gradientDirection,
				args.wrapperClassName
			);
		}

		return Wrap(
			<button
				className={clsx(
					'font-medium',
					rounding[rounded],
					themed,
					intent !== 'img' && sizeClass,
					className
				)}
				{...args}
				ref={ref}
			>
				{props.children}
			</button>,
			intent === 'outlined',
			bg,
			gradientDirection,
			args.wrapperClassName
		);
	}
);
Button.displayName = 'Button';

export function Wrap(
	children: React.ReactElement,
	doWrap: boolean,
	bgColor: string | undefined = undefined,
	gradientDirection: GradientDirection | undefined = undefined,
	wrapperClassName: string | undefined = undefined
): React.ReactElement {
	if (doWrap) {
		const modified = React.cloneElement(children, {
			style: { backgroundColor: bgColor },
		});

		return (
			<GradientWrapper
				className={cn(
					'mr-2 mb-2 text-white from-primary-a to-primary-c',
					wrapperClassName
				)}
				rounded="full"
				gradientDirection={gradientDirection}
			>
				{modified}
			</GradientWrapper>
		);
	}
	return children;
}

export const newButtonVariants = cva(
	'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline:
					'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
				secondary:
					'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);
