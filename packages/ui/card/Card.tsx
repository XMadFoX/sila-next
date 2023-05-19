import { GradientWrapper } from '../general';
import { CardPreview } from './CardPreview';
import { CardDetails } from './CardDetails';

interface CardProps {
	children: React.ReactNode;
	big?: boolean;
}

export function Card({ children, big }: CardProps) {
	return (
		<GradientWrapper
			className={`overflow-hidden rounded-[20px] bg-primary ${
				big ? 'max-w-[670px] h-[640px]' : 'max-w-[427px]'
			}`}
		>
			<span
				className={`bg-white rounded-[19px] ${
					big ? 'max-w-[668px] h-[638px]' : ''
				}`}
			>
				<figure className="flex flex-col p-6">{children}</figure>
			</span>
		</GradientWrapper>
	);
}

Card.Preview = CardPreview;
Card.Details = CardDetails;
