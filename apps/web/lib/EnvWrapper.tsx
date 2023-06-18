'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { EnvironmentContext } from 'ui/env';
import { Link, Image } from './EnvComponents';
import { SessionProvider, signIn } from 'next-auth/react';
import type { Session } from 'next-auth';
import { Header } from 'ui';
import { ErrorBoundary } from 'react-error-boundary';

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
				<ErrorBoundary fallback={<div>Oops. Failed to load header</div>}>
					<Header signIn={signIn} />
				</ErrorBoundary>
				{children}
			</EnvironmentContext.Provider>
		</SessionProvider>
	);
}
