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
				'relative before:absolute before:w-[134px] before:h-1 before:bg-primary before:-bottom-1 text-center md:text-start'
			)}
		>
			{children}
		</Tag>
	);
};
