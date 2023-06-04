import './globals.css';
import { Inter } from 'next/font/google';
import { Footer, Header } from 'ui';
import { TrpcProvider } from '../lib/TrpcProvider';
import EnvWrapper from '../lib/EnvWrapper';

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
				<TrpcProvider>
					<EnvWrapper session={session}>
						<Header />
						{children}
						<Footer />
					</EnvWrapper>
				</TrpcProvider>
			</body>
		</html>
	);
}
