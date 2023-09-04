import React from 'react';
import { newButtonVariants } from '../general';
import { cn } from '../lib/utils';
import entryTypes from '@sila/api/entryTypes';

interface EventHeaderProps {
	timestamp: Date;
	// duration: number | null;
	location: {
		city: string;
		address: string;
	} | null;
	entryType: keyof typeof entryTypes;
}

export function EventHeader(props: EventHeaderProps) {
	return (
		<ul
			className="flex gap-x-4 py-4 divide-x divide-dark-grey"
			style={{
				border: '2px solid transparent',
				borderImage: 'var(--gradient) 90 / 1 / 0 stretch',
			}}
		>
			<Cell className="items-start text-start">
				{new Intl.DateTimeFormat('ru-RU', {
					day: 'numeric',
					month: 'long',
				}).format(props.timestamp)}
				<br />
				<span className="text-sm opacity-50">
					{new Intl.DateTimeFormat('ru-RU', {
						weekday: 'long',
					}).format(props.timestamp)}
				</span>
			</Cell>
			<Cell>
				{new Intl.DateTimeFormat('ru-RU', {
					hour: 'numeric',
					minute: 'numeric',
				}).format(props.timestamp)}
				<br />
				<span className="text-sm opacity-50">
					{Intl.DateTimeFormat().resolvedOptions().timeZone}
				</span>
				{/* TODO: duration */}
			</Cell>
			<Cell className="items-start text-start">
				{props.location ? (
					<address className="not-italic">
						<span className="text-sm opacity-50">{props.location.city}</span>
						<br />
						<span className="text-sm">{props.location.address}</span>
						<br />
						<button className="text-sm opacity-50">
							Карта и схема проезда
						</button>
					</address>
				) : (
					<Tag>Онлайн</Tag>
				)}
			</Cell>
			<Cell className="px-8">
				<Tag>{entryTypes[props.entryType]}</Tag>
			</Cell>
		</ul>
	);
}

const Cell = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<li
		className={cn(
			'flex flex-col px-4 justify-center text-center items-center',
			className
		)}
	>
		{children}
	</li>
);
const Tag = ({ children }: { children: React.ReactNode }) => (
	<span className={newButtonVariants({ variant: 'outline' })}>{children}</span>
);
