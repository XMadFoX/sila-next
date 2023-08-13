import './globals.css';
import { Inter } from 'next/font/google';
import { Footer } from 'ui';
import { TrpcProvider } from '../lib/TrpcProvider';
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
	return (
		<html lang="en" className={inter.className}>
			<body className="flex flex-col items-center min-h-screen dark:bg-[#1e1e1e] dark:text-[#fff]">
				<TrpcProvider>
					<EnvWrapper>
						{authModal}
						{children}
						<Footer />
					</EnvWrapper>
				</TrpcProvider>
			</body>
		</html>
	);
}
