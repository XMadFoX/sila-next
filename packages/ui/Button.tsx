import clsx from 'clsx';
import * as React from 'react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	intent?: 'primary' | 'clear' | 'outlined';
	gradientDirection?: 'r' | 'l' | 't' | 'b';
	size?: 'sm' | 'md' | 'lg';
}

const gradientClassNames = {
	r: 'bg-gradient-to-r',
	l: 'bg-gradient-to-l',
	t: 'bg-gradient-to-t',
	b: 'bg-gradient-to-b',
};

export function Button(props: ButtonProps) {
	const { style, ...args } = props;
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

	return (
		<button
			className={clsx(
				'rounded-full font-medium',
				themed,
				props.size === 'sm' && 'text-sm py-2 px-4',
				props.size === 'md' && 'text-base py-4 px-8',
				props.size === 'lg' && 'text-lg py-6 px-12'
			)}
			{...args}
		>
			{props.children}
		</button>
	);
}

const defaultProps: Partial<ButtonProps> = {
	intent: 'primary',
	size: 'md',
	gradientDirection: 'r',
};

Button.defaultProps = defaultProps;
