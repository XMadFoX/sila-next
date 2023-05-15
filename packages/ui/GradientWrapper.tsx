import clsx from 'clsx';

const gradientClassNames = {
	r: 'bg-gradient-to-r',
	l: 'bg-gradient-to-l',
	t: 'bg-gradient-to-t',
	b: 'bg-gradient-to-b',
};

const rounds = {
	full: 'rounded-full',
	sm: 'rounded-sm',
	md: 'rounded-md',
	lg: 'rounded-lg',
	xl: 'rounded-xl',
};

interface GradientWrapperProps {
	as: keyof JSX.IntrinsicElements;
	className?: string;
	gradientDirection?: 'r' | 'l' | 't' | 'b';
	rounded?: keyof typeof rounds;
	children: React.ReactNode;
}

export function GradientWrapper(props: GradientWrapperProps) {
	const { as: Tag, gradientDirection, children } = props;

	return (
		<Tag
			className={clsx(
				'inline-flex overflow-hidden relative justify-center items-center p-[1px]',
				rounds[props?.rounded || 'full'],
				gradientClassNames[gradientDirection || 'r'],
				props.className
			)}
		>
			{children}
		</Tag>
	);
}

GradientWrapper.defaultProps = {
	as: 'span',
};

export { gradientClassNames };
