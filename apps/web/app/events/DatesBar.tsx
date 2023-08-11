import React from 'react';
import { Button } from 'ui';

function getNextDays(): number[] {
	const today = new Date();
	const next30Days: number[] = [];

	for (let i = 0; i < 60; i++) {
		const currentDate = new Date();
		currentDate.setDate(today.getDate() + i);

		next30Days.push(currentDate.getDate());
	}

	return next30Days;
}

export default function DatesBar() {
	const dates = getNextDays();

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
