import React from 'react';

export default function CardList({ children }: { children: React.ReactNode }) {
	return (
		<ul className="flex flex-wrap gap-14 items-stretch mt-8 justify-stretch">
			{children}
		</ul>
	);
}
