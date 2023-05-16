import clsx from 'clsx';
import * as React from 'react';
import { gradientClassNames, GradientWrapper } from './GradientWrapper';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	intent?: 'primary' | 'clear' | 'outlined' | 'img';
	gradientDirection?: 'r' | 'l' | 't' | 'b';
	size?: 'sm' | 'md' | 'lg';
	bg?: string;
}

export function Button(props: ButtonProps) {
	const { style, gradientDirection, size, bg, ...args } = props;
	let themed = '';

	switch (props.intent) {
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

	return props.intent !== 'outlined' ? (
		<button
			className={clsx('rounded-full font-medium', themed, sizeClass)}
			{...args}
		>
			{props.children}
		</button>
	) : (
		<GradientWrapper
			className="mr-2 mb-2 text-white from-primary-a to-primary-c"
			rounded="full"
			gradientDirection={gradientDirection}
		>
			<button
				className={clsx('p-2 rounded-full', sizeClass, themed)}
				style={{ backgroundColor: 'grey' }}
			>
				{props.children}
			</button>
		</GradientWrapper>
	);
}

const defaultProps: Partial<ButtonProps> = {
	intent: 'primary',
	size: 'md',
	gradientDirection: 'r',
	bg: 'grey',
};

Button.defaultProps = defaultProps;

/*
<button
			className={clsx(
				`inline-flex overflow-hidden relative justify-center items-center mr-2 mb-2 rounded-full p-[1px]`,
				themed
			)}
		>
			<span
				className={clsx('relative py-2.5 px-5 rounded-full', sizeClass)}
				style={{ backgroundColor: props.bg }}
			>
				{props.children}
			</span>
		</button>
*/
