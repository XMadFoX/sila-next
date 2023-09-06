'use client';

import clsx from 'clsx';
import { useContext } from 'react';
import { EnvironmentContext } from '../env';
import { Badge } from './Badge';
import { LikeButton } from './LikeButton';

interface CardPreviewProps {
	image: string;
	big?: boolean;
	alt: string;
	badges: string[];
	className?: string;
}

export function CardPreview({
	image,
	big,
	alt,
	badges,
	className,
}: CardPreviewProps) {
	const { Image } = useContext(EnvironmentContext);

	return (
		<div
			className={clsx(
				'overflow-hidden relative rounded-lg min-w-fit md:max-w-[624px]',
				className
			)}
		>
			<Image
				src={image}
				alt={alt}
				height={big ? 330 : 200}
				width={big ? 624 : 377}
				draggable={false}
				className={clsx(
					big ? 'w-[624px] h-[330px' : 'w-[377] h-[200px]',
					'object-cover'
				)}
			/>
			<ul className="flex absolute right-3 bottom-3 gap-4">
				{badges.map((text) => (
					<li key={text}>
						<Badge>{text}</Badge>
					</li>
				))}
			</ul>
			<LikeButton />
		</div>
	);
}
