import clsx from 'clsx';
import * as React from 'react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	intent?: 'primary' | 'clear' | 'outlined';
	gradientDirection?: 'r' | 'l' | 't' | 'b';
	size?: 'sm' | 'md' | 'lg';
	bg?: string;
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
		case 'outlined':
			themed = `from-primary-a via-primary-b to-primary-c text-grey ${
				gradientClassNames[props.gradientDirection || 'r']
			}`;
			break;
		case 'primary':
			themed = `from-primary-a via-primary-b to-primary-c text-white ${
				gradientClassNames[props.gradientDirection || 'r']
			}`;
			break;
		case 'clear':
			themed = 'bg-white text-black';
			break;
	}

	let size = '';

	switch (props.size) {
		case 'sm':
			size = 'text-sm py-2 px-4';
			break;
		case 'md':
			size = 'text-base py-4 px-8';
			break;
		case 'lg':
			size = 'text-lg py-6 px-12';
			break;
	}

	return props.intent !== 'outlined' ? (
		<button
			className={clsx('rounded-full font-medium', themed, size)}
			{...args}
		>
			{props.children}
		</button>
	) : (
		<button
			className={clsx(
				`inline-flex overflow-hidden relative justify-center items-center mr-2 mb-2 rounded-full p-[1px]`,
				themed
			)}
		>
			<span
				className={clsx('relative py-2.5 px-5 rounded-full', size)}
				style={{ backgroundColor: props.bg }}
			>
				{props.children}
			</span>
		</button>
	);
}

const defaultProps: Partial<ButtonProps> = {
	intent: 'primary',
	size: 'md',
	gradientDirection: 'r',
	bg: 'grey',
};

Button.defaultProps = defaultProps;
