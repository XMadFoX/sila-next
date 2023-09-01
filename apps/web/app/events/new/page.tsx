'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const NewEvent = dynamic(() => import('ui/events').then((m) => m.NewEvent), {
	ssr: false,
});

export default function Page() {
	const [project, setProject] = useState(false);
	return (
		<>
			<button
				onClick={() => setProject((v) => !v)}
				className={project ? 'bg-blue' : 'bg-error'}
			>
				toggle
			</button>
			<NewEvent project={project} />
		</>
	);
}
