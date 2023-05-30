import './globals.css';
import { Inter } from 'next/font/google';
import { Footer, Header } from 'ui';
import Image from 'next/image';
import Link from 'next/link';

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
				<Header image={Image} link={Link} />
				{children}
				<Footer />
			</body>
		</html>
	);
}
