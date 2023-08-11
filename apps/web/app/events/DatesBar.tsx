'use client';

import { cn } from 'ui/lib/utils';
import React from 'react';
import { Button } from 'ui';
import { $selectedDate } from './date.atom';
import { useStore } from '@nanostores/react';

function getNextDays(numDays: number): number[] {
	const today = new Date();
	today.setHours(0, 0, 0, 0); // Set time to 00:00, used for start time filter

	const nextDaysStartTimestamps: number[] = [];

	for (let i = 0; i < numDays; i++) {
		const currentDate = new Date(today);
		currentDate.setDate(today.getDate() + i);

		nextDaysStartTimestamps.push(currentDate.getTime());
	}

	return nextDaysStartTimestamps;
}

export default function DatesBar() {
	const dates = getNextDays(60);
	const dayDigitFormat = new Intl.DateTimeFormat('ru-RU', { day: '2-digit' });
	const dayFormat = new Intl.DateTimeFormat('ru-RU', { weekday: 'short' });

	const selectedDate = useStore($selectedDate);

	return (
		<div className="mt-8">
			<ul className="flex overflow-x-scroll gap-2 pb-4 w-full">
				{dates.map((date, idx) => (
					<li key={`${idx}:${date}`}>
						<Button
							onClick={() => $selectedDate.set(new Date(date))}
							size={null}
							aria-label={`Выбрать дату ${date} ${new Intl.DateTimeFormat(
								'ru-RU',
								{ month: 'long' }
							).format(new Date())}`}
							className={cn(
								'text-xl font-medium relative',
								'flex flex-col p-2 justify-center items-center w-8 h-12 from-10% to-90% bg-center rounded-lg hover:text-white hover:bg-gradient-to-br from-primary-a to-primary-c',
								selectedDate.getTime() === date &&
									'text-white bg-gradient-to- bg-primary-45'
							)}
							intent="clear"
						>
							<p>{dayDigitFormat.format(new Date(date))}</p>
							<span className="block text-sm">{dayFormat.format(date)}</span>
						</Button>
					</li>
				))}
			</ul>
		</div>
	);
}
