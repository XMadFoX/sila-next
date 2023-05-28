import clsx from 'clsx';
import { Button } from '../general';
import { Badge } from './Badge';
import { LikeButton } from './LikeButton';

interface CardPreviewProps {
	image: string;
	big?: boolean;
	alt: string;
	badges: string[];
	className?: string;
	as: React.ElementType;
}

export function CardPreview({
	image,
	big,
	alt,
	badges,
	className,
	as: Tag,
}: CardPreviewProps) {
	return (
		<div
			className={clsx(
				'overflow-hidden relative rounded-lg min-w-fit md:max-w-[624px]',
				className
			)}
		>
			<Tag
				src={image}
				alt={alt}
				height={big ? 330 : 200}
				width={big ? 624 : 377}
				draggable={false}
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
