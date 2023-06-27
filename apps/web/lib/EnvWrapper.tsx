'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { EnvironmentContext } from 'ui/env';
import { Link, Image } from './EnvComponents';
import { SessionProvider, signIn } from 'next-auth/react';
import type { Session } from 'next-auth';
import { Header } from 'ui';
import { ErrorBoundary } from 'react-error-boundary';

import i18next from 'i18next';
import { z } from 'zod';
import { zodI18nMap } from 'zod-i18n-map';
import translation from 'zod-i18n-map/locales/ru/zod.json';

i18next.init({
	lng: 'ru',
	resources: {
		ru: { zod: translation },
	},
});
z.setErrorMap(zodI18nMap);

export default function EnvWrapper({
	children,
	session,
}: {
	children: React.ReactNode;
	session?: Session | null;
}) {
	return (
		<SessionProvider session={session} refetchOnWindowFocus={false}>
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
