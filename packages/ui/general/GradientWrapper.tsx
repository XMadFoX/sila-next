import clsx from 'clsx';
import { rounding, Rounding } from '../lib';

const gradientClassNames = {
	r: 'bg-gradient-to-r',
	l: 'bg-gradient-to-l',
	t: 'bg-gradient-to-t',
	b: 'bg-gradient-to-b',
	br: 'bg-gradient-to-br',
};

type GradientDirection = keyof typeof gradientClassNames;

interface GradientWrapperProps {
	as?: keyof JSX.IntrinsicElements;
	className?: string;
	gradientDirection?: GradientDirection;
	rounded?: Rounding;
	children: React.ReactNode;
}

export function GradientWrapper(props: GradientWrapperProps) {
	const {
		as: Tag = 'span',
		gradientDirection,
		rounded,
		children,
		className,
	} = props;

	return (
		<Tag
			className={clsx(
				'inline-flex overflow-hidden justify-center items-center p-[1px]',
				rounded && rounding[rounded],
				gradientClassNames[gradientDirection || 'r'],
				className
			)}
		>
			{children}
		</Tag>
	);
}

export { gradientClassNames };
export type { GradientDirection };
