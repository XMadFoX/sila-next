'use client';

import { GradientWrapper } from '../general';
import { CardPreview } from './CardPreview';
import { CardDetails } from './CardDetails';
import clsx from 'clsx';
import Link from 'next/link';

export interface CardProps {
	id: number;
	children: React.ReactNode;
	big?: boolean;
	gradientClass?: string;
	kind: 'event' | 'project';
}

export const linkMap = {
	event: 'events' as const,
	project: 'projects' as const,
};

export function Card({ children, big, id, gradientClass, kind }: CardProps) {
	return (
		<Link
			href={`/${linkMap[kind]}/${id}`}
			draggable={false}
			onClick={(e: React.MouseEvent<HTMLElement>) => {
				const allowedTags = [
					'img',
					'a',
					'h2',
					'p',
					'address',
					'time',
					'span',
					'figure',
				];
				const target = e.target as HTMLElement;
				if (
					!allowedTags.includes(target.tagName.toLowerCase()) ||
					target.getAttribute('data-clickable') === 'true'
				) {
					e.preventDefault();
				}
			}}
		>
			<GradientWrapper
				className={clsx(
					gradientClass,
					'overflow-hidden rounded-[20px] bg-primary',
					big ? 'max-w-[670px] h-[640px]' : 'max-w-[427px]',
					'hover:shadow-xl transition-all duration-300 relative'
				)}
			>
				<span
					className={`bg-white rounded-[19px] h-full ${big ? 'w-full' : ''}`}
				>
					<figure className="flex flex-col p-6">{children}</figure>
				</span>
			</GradientWrapper>
		</Link>
	);
}

Card.Preview = CardPreview;
Card.Details = CardDetails;
