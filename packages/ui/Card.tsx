import { Badge } from './Badge';
import { Button } from './Button';
import { GradientWrapper } from './GradientWrapper';

interface CardProps {
	children: React.ReactNode;
}

interface CardPreviewProps {
	image: string;
	big: boolean;
	alt: string;
	badges: string[];
	as: React.ElementType;
}

function CardPreview({ image, big, alt, badges, as: Tag }: CardPreviewProps) {
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
					<li>
						<Badge>{text}</Badge>
					</li>
				))}
			</ul>
			<Button
				intent="img"
				className="flex absolute top-3 right-3 justify-center items-center p-1 w-10 h-10 rounded-full bg-gray-900/50"
			>
				<svg
					width="22"
					height="21"
					viewBox="0 0 22 21"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M11.11 17.5464L11 17.6592L10.879 17.5464C5.654 12.6831 2.2 9.46716 2.2 6.20612C2.2 3.94935 3.85 2.25677 6.05 2.25677C7.744 2.25677 9.394 3.38516 9.977 4.91976H12.023C12.606 3.38516 14.256 2.25677 15.95 2.25677C18.15 2.25677 19.8 3.94935 19.8 6.20612C19.8 9.46716 16.346 12.6831 11.11 17.5464ZM15.95 0C14.036 0 12.199 0.913993 11 2.34704C9.801 0.913993 7.964 0 6.05 0C2.662 0 0 2.71941 0 6.20612C0 10.4601 3.74 13.9469 9.405 19.2164L11 20.7059L12.595 19.2164C18.26 13.9469 22 10.4601 22 6.20612C22 2.71941 19.338 0 15.95 0Z"
						fill="white"
					/>
				</svg>
			</Button>
		</div>
	);
}

interface CardDetailsProps {
	title: string;
	location: { city: string; address?: string };
	date: Date;
	description: string;
	org: {
		name: string;
		link: string;
	};
}

function cutText(text: string, maxLength: number) {
	if (text.length <= maxLength) {
		return text;
	}

	return text.slice(0, maxLength) + '...';
}

function CardDetails(props: CardDetailsProps) {
	return (
		<figcaption className="flex flex-col mt-4">
			<h2 className="text-xl font-medium text-black">{props.title}</h2>
			<address className="mt-4 text-base not-italic text-dark-grey">
				{props.location.city}
				<br />
				<span className="text-sm">{props.location.address}</span>
			</address>
			<time className="mt-4 text-base font-medium text-black">
				{props.date.toLocaleTimeString(undefined, {
					hour: '2-digit',
					minute: '2-digit',
					day: '2-digit',
					month: 'long',
					...(props.date.getFullYear() !== new Date().getFullYear() && {
						year: 'numeric',
					}),
				})}
			</time>
			<p className="mt-4 text-sm text-black">
				{cutText(props.description, 190)}
			</p>
			<a className="mt-5 underline text-dark-grey" href={props.org.link}>
				Организатор: {props.org.name}
			</a>
		</figcaption>
	);
}

interface CardProps {
	children: React.ReactNode;
}

export function Card({ children }: CardProps) {
	return (
		<GradientWrapper className="overflow-hidden rounded-[20px] bg-primary max-w-[670px] h-[640px]">
			<span className="bg-white rounded-[19px] max-w-[668px] h-[638px]">
				<figure className="flex flex-col p-6">{children}</figure>
			</span>
		</GradientWrapper>
	);
}

Card.Preview = CardPreview;
Card.Details = CardDetails;
