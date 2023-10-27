'use client';

import { trpc } from 'lib/trpc';
import React from 'react';
import { Header } from 'ui/profile';
import useSession from 'ui/useSession';

export default function Layout({ children }) {
	const { data } = useSession();
	if (!data?.user) return 'Loading';
	return (
		<div className="w-full max-w-[1400px]">
			<Header
				img={data?.user.image}
				id={data?.user?.id}
				name={data?.user.name}
			/>
			{children}
		</div>
	);
}
