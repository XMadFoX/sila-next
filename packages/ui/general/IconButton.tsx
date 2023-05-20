import clsx from 'clsx';
import React from 'react';
import { UrlObject } from 'url';
import { Button } from './Button';

interface IconButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	href?: string | UrlObject;
}

export const IconButton = (props: IconButtonProps) => {
	const { className, ...args } = props;

	return (
		<Button
			intent="img"
			className={clsx(
				'flex justify-center items-center w-full h-full',
				className,
				props.disabled && 'cursor-not-allowed'
			)}
			{...args}
		>
			{props.children}
		</Button>
	);
};
