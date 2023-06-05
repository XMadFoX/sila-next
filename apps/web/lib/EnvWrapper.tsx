'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { EnvironmentContext } from 'ui/env';
import { Link, Image } from './EnvComponents';
import { SessionProvider, signIn } from 'next-auth/react';
import type { Session } from 'next-auth';
import { Header } from 'ui';

export default function EnvWrapper({
	children,
	session,
}: {
	children: React.ReactNode;
	session: Session;
}) {
	return (
		<SessionProvider session={session}>
			<EnvironmentContext.Provider
				value={{
					Link: Link,
					Image: Image,
					usePathname: usePathname,
				}}
			>
				<Header signIn={signIn} />
				{children}
			</EnvironmentContext.Provider>
		</SessionProvider>
	);
}
