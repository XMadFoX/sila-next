import React from 'react';
import { ListEvents } from 'ui/admin/events/types';
import dynamic from 'next/dynamic';
const CreateEvent = dynamic(() => import('ui/admin/events/types/create'), {
	ssr: false,
});

export default function page() {
	return (
		<div className="flex flex-col justify-center h-full grow">
			<ListEvents />
			<CreateEvent />
		</div>
	);
}
