import clsx from 'clsx';
import React from 'react';
import { GradientWrapper } from '../GradientWrapper';
import { IconButton } from '../IconButton';

interface ControlsProps extends React.HTMLAttributes<HTMLButtonElement> {
	next?: true;
	disabled?: boolean;
}

export const Controls = (props: ControlsProps) => {
	const { next, className, disabled, ...args } = props;

	return (
		<GradientWrapper
			className={clsx(
				'from-10% from-primary-a via-30% via-primary-b to-primary-c',
				next && '-scale-x-100',
				className || 'w-14 h-14',
				disabled && 'opacity-50'
			)}
			gradientDirection="br"
			rounded="full"
		>
			<IconButton
				className="flex justify-center items-center w-full h-full"
				disabled={disabled}
				{...args}
			>
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
			</IconButton>
		</GradientWrapper>
	);
};
