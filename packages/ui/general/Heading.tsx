import clsx from 'clsx';
import React from 'react';

interface HeadingProps {
	children: string;
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
	className?: string;
}

export const Heading = ({ as, children, className }: HeadingProps) => {
	const Tag = as || 'h2';

	return (
		<Tag
			className={clsx(
				className || 'text-3xl text-black font-medium',
				'relative before:absolute before:w-[134px] before:h-1 before:bg-primary before:-bottom-2 text-center lg:text-start before:left-1/2 before:transform before:-translate-x-1/2 lg:before:left-0 lg:before:transform-none lg:before:translate-x-0'
			)}
		>
			{children}
		</Tag>
	);
};
