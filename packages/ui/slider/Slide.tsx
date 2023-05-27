import React from 'react';

export function Slide({ children }: { children: React.ReactNode }) {
	return (
		<li className="2xl:flex-auto snap-start snap-always flex-card-full">
			{children}
		</li>
	);
}
