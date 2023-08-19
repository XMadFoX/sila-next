import React from 'react';
import { CreateEvent, ListEvents } from 'ui/admin/events/types';

export default function page() {
	return (
		<div className="flex flex-col justify-center h-full grow">
			<ListEvents />
			<CreateEvent />
		</div>
	);
}
