import React from 'react';
import { newButtonVariants } from '../general';
import { cn } from '../lib/utils';
import entryTypes from '@sila/api/ads/entryTypes';

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
	const tags = [entryTypes[props.entryType]];
	if (!props.location) tags.push('Онлайн');

	return (
		<div>
			<ul className="flex gap-2 md:hidden">
				{tags.map((tag) => (
					<li className="inline-block mr-4" key={tag}>
						<Tag>{tag}</Tag>
					</li>
				))}
			</ul>
			<ul
				className="flex gap-x-4 py-4 divide-x divide-dark-grey mt-4 md:mt-auto"
				style={{
					border: '2px solid transparent',
					borderImage: 'var(--gradient) 90 / 1 / 0 stretch',
				}}
			>
				<Cell className="items-start text-start w-1/2 md:w-auto whitespace-nowrap">
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
				<Cell className="w-1/2 md:w-auto items-start md:items-center">
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
				<Cell className="items-start text-start hidden md:block">
					{props.location ? (
						<address className="not-italic">
							<span className="text-sm opacity-50">{props.location.city}</span>
							<br />
							<span className="text-sm">{props.location.address}</span>
							<br />
							<button className="text-sm opacity-50 whitespace-nowrap">
								Карта и схема проезда
							</button>
						</address>
					) : (
						<Tag>Онлайн</Tag>
					)}
				</Cell>
				<Cell className="px-8 hidden md:flex items-center justify-center">
					<Tag>{entryTypes[props.entryType]}</Tag>
				</Cell>
			</ul>
			{props.location && (
				<address className="not-italic mt-4 md:hidden">
					<span className="text-sm opacity-50">{props.location.city}</span>
					<br />
					<span className="text-sm">{props.location.address}</span>
					<br />
					<button className="text-sm underline underline-offset-4 md:no-underline md:opacity-50">
						Карта и схема проезда
					</button>
				</address>
			)}
		</div>
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
			'flex flex-col px-4 justify-center text-center items-center w-full',
			className
		)}
	>
		{children}
	</li>
);
const Tag = ({ children }: { children: React.ReactNode }) => (
	<span className={newButtonVariants({ variant: 'outline' })}>{children}</span>
);
