import React from 'react';
import { Card } from './Card';
import clsx from 'clsx';

export function CardSkeleton({ big }: { big?: boolean }) {
	return (
		<Card gradientClass="w-[427px] p-[1px]" id={0}>
			<div>
				<div
					className={clsx(
						'animate-pulse rounded-lg 1w-[624px] w-[377px] h-[200px] 1h-[320px] bg-grey'
					)}
				></div>
			</div>
			<figcaption className="flex flex-col mt-4">
				<span className="w-72 h-7 font-medium rounded-lg animate-pulse bg-dark-grey"></span>
				<span className="mt-4 w-16 rounded-lg animate-pulse h-[22px] bg-dark-grey"></span>
				<span className="mt-1 w-48 h-5 rounded-lg animate-pulse bg-dark-grey"></span>
				<span className="mt-4 w-40 rounded-lg animate-pulse h-[22px] bg-dark-grey"></span>
				<div className="flex flex-wrap gap-1 mt-4 w-full h-16">
					{new Array(15).fill(0).map((_, idx) => (
						<span
							key={idx}
							className="inline-block h-4 rounded-lg animate-pulse bg-dark-grey"
							style={{ width: randomInt(20, 100) }}
						></span>
					))}
				</div>
				<span
					className="mt-5 w-32 h-5 rounded-lg animate-pulse bg-grey"
					data-clickable
				></span>
			</figcaption>
		</Card>
	);
}

function randomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
