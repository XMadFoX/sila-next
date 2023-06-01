import clsx from 'clsx';
import React from 'react';
import { Button } from './Button';

interface IconButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	href?: string;
}

export const IconButton = (props: IconButtonProps) => {
	const { className, ...args } = props;

	return (
		<Button
			intent="img"
			className={clsx(
				'flex justify-center items-center',
				className,
				props.disabled && 'cursor-not-allowed'
			)}
			{...args}
		>
			{props.children}
		</Button>
	);
};
