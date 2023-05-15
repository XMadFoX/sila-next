import { GradientWrapper } from './GradientWrapper';

interface BadgeProps {
	children: React.ReactNode;
}

export function Badge({ children }: BadgeProps) {
	return (
		<GradientWrapper
			className="py-1 px-4 text-sm font-medium text-white bg-primary"
			as="p"
		>
			{children}
		</GradientWrapper>
	);
}
