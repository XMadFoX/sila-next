'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { Footer, Header } from 'ui';
import { usePathname } from 'next/navigation';
import { EnvironmentContext } from 'ui/env';
import { Image, Link } from '../lib/EnvComponents';

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={inter.className}>
			<body className="flex flex-col items-center min-h-screen">
				<EnvironmentContext.Provider
					value={{
						Link: Link,
						Image: Image,
						usePathname: usePathname,
					}}
				>
					<Header />
					{children}
					<Footer />
				</EnvironmentContext.Provider>
			</body>
		</html>
	);
}
