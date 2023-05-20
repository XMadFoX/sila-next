import { Button } from '../general';
import { Badge } from './Badge';
import { LikeButton } from './LikeButton';

interface CardPreviewProps {
	image: string;
	big?: boolean;
	alt: string;
	badges: string[];
	as: React.ElementType;
}

export function CardPreview({
	image,
	big,
	alt,
	badges,
	as: Tag,
}: CardPreviewProps) {
	return (
		<div className="overflow-hidden relative rounded-lg">
			<Tag
				src={image}
				alt={alt}
				height={big ? 330 : 200}
				width={big ? 624 : 377}
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
