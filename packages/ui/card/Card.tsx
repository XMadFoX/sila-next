import { GradientWrapper } from '../general';
import { CardPreview } from './CardPreview';
import { CardDetails } from './CardDetails';

interface CardProps {
	children: React.ReactNode;
	big?: boolean;
	gradientClass?: string;
}

export function Card({ children, big, gradientClass }: CardProps) {
	return (
		<GradientWrapper
			className={
				gradientClass +
				' ' +
				`overflow-hidden rounded-[20px] bg-primary ${
					big ? 'max-w-[670px] h-[640px]' : 'max-w-[427px]'
				}`
			}
		>
			<span
				className={`bg-white rounded-[19px] h-full ${
					big ? 'max-w-[668px]' : ''
				}`}
			>
				<figure className="flex flex-col p-6">{children}</figure>
			</span>
		</GradientWrapper>
	);
}

Card.Preview = CardPreview;
Card.Details = CardDetails;
