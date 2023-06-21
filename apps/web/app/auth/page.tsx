import React from 'react';
import { Auth } from 'ui/auth';

export default function page() {
	return (
		<div className="flex justify-center items-center min-h-full grow">
			<Auth />
		</div>
	);
}
