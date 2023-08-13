'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { EnvironmentContext } from 'ui/env';
import { Link, Image } from './EnvComponents';
import { Header } from 'ui';
import { ErrorBoundary } from 'react-error-boundary';

import i18next from 'i18next';
import { z } from 'zod';
import { zodI18nMap } from 'zod-i18n-map';
import translation from 'zod-i18n-map/locales/ru/zod.json';

import dynamic from 'next/dynamic';
const ToastContainer = dynamic(
	() => import('react-toastify').then((m) => m.ToastContainer),
	{ ssr: false }
);
import 'react-toastify/dist/ReactToastify.min.css';

i18next.init({
	lng: 'ru',
	resources: {
		ru: { zod: translation },
	},
});
z.setErrorMap(zodI18nMap);

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
			<ErrorBoundary fallback={<div>Oops. Failed to load header</div>}>
				<Header />
			</ErrorBoundary>
			<ToastContainer />
			{children}
		</EnvironmentContext.Provider>
	);
}
