import React from 'react';
import { Button } from 'ui';

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

	return (
		<div className="mt-8">
			<ul className="flex overflow-x-scroll gap-2 pb-4 w-full">
				{dates.map((date, idx) => (
					<li key={`${idx}:${date}`}>
						<Button
							size={null}
							className="flex justify-center items-center w-8 h-12 rounded-lg hover:text-white hover:bg-primary"
							intent="clear"
						>
							{date}
						</Button>
					</li>
				))}
			</ul>
		</div>
	);
}
