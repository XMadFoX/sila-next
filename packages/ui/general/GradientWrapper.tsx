import clsx from 'clsx';

const gradientClassNames = {
	r: 'bg-gradient-to-r',
	l: 'bg-gradient-to-l',
	t: 'bg-gradient-to-t',
	b: 'bg-gradient-to-b',
	br: 'bg-gradient-to-br',
};

type GradientDirection = keyof typeof gradientClassNames;

const rounds = {
	full: 'rounded-full',
	sm: 'rounded-sm',
	md: 'rounded-md',
	lg: 'rounded-lg',
	xl: 'rounded-xl',
};

interface GradientWrapperProps {
	as?: keyof JSX.IntrinsicElements;
	className?: string;
	gradientDirection?: GradientDirection;
	rounded?: keyof typeof rounds;
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
				rounded && rounds[rounded],
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
