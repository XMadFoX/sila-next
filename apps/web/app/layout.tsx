import './globals.css';
import { Inter } from 'next/font/google';
import { Footer } from 'ui';
import { TrpcProvider } from '../lib/TrpcProvider';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]/route';
import EnvWrapper from '../lib/EnvWrapper';

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
});

export default async function RootLayout({
	children,
	authModal,
}: {
	children: React.ReactNode;
	authModal: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);
	return (
		<html lang="en" className={inter.className}>
			<body className="flex flex-col items-center min-h-screen">
				<TrpcProvider>
					<EnvWrapper session={session}>
						{authModal}
						{children}
						<Footer />
					</EnvWrapper>
				</TrpcProvider>
			</body>
		</html>
	);
}
