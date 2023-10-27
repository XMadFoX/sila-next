import React from 'react';
import { ListEvents } from 'ui/admin/events/types';
import dynamic from 'next/dynamic';
const CreateEvent = dynamic(() => import('ui/admin/events/types/create'), {
	ssr: false,
});

const kind = 'project';

export default function page() {
	return (
		<div className="flex flex-col justify-center h-full grow">
			<ListEvents kind={kind} />
			<CreateEvent kind={kind} />
		</div>
	);
}
