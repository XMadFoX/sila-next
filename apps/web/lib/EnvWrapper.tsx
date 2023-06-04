'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { EnvironmentContext } from 'ui/env';
import { Link, Image } from './EnvComponents';

export default function EnvWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<EnvironmentContext.Provider
			value={{
				Link: Link,
				Image: Image,
				usePathname: usePathname,
			}}
		>
			{children}
		</EnvironmentContext.Provider>
	);
}
