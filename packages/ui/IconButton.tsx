import clsx from 'clsx';
import React from 'react';
import { Button } from './Button';

interface IconButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const IconButton = (props: IconButtonProps) => {
	return (
		<Button
			intent="img"
			className={clsx(
				'flex justify-center items-center w-full h-full',
				props.className
			)}
		>
			{props.children}
		</Button>
	);
};
