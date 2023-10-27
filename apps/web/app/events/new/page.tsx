'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const NewEvent = dynamic(() => import('ui/events').then((m) => m.NewEvent), {
	ssr: false,
});

export default function Page() {
	return (
		<>
			<NewEvent />
		</>
	);
}
