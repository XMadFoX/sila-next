import React from 'react';

export function StandaloneModal({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex justify-center items-center min-h-full grow">
			{children}
		</div>
	);
}
