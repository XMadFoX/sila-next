'use client';

import { useContext } from 'react';
import { EnvironmentContext } from '../env';

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

export function CardDetails(props: CardDetailsProps) {
	const { Link } = useContext(EnvironmentContext);

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
			<Link
				className="mt-5 text-sm underline text-dark-grey"
				href={props.org.link}
			>
				Организатор: {props.org.name}
			</Link>
		</figcaption>
	);
}
