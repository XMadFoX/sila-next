'use client';

import { useContext } from 'react';
import { Button } from '../general';
import { navLinks } from './navLinks';
import { EnvironmentContext } from '../env/';

export function Header({ signIn }: { signIn: () => void }) {
	const { Image, Link, usePathname } = useContext(EnvironmentContext);
	const pathname = usePathname();

	return (
		<header className="flex flex-col pt-4 mx-auto w-full max-w-[1400px]">
			<nav>
				<ul className="flex items-center">
					<Link href="/">
						<Image src="/logo.png" alt="logo" width={64} height={64} />
					</Link>
					{/* <input
            type="text"
            placeholder="Search"
            disabled
            className="rounded-full"
          /> */}
					<Button
						size={null}
						onClick={signIn}
						className="px-8 ml-auto h-12 text-sm uppercase"
					>
						Войти
					</Button>
				</ul>
			</nav>
			<nav className="mx-auto mt-7">
				<ul className="flex flex-wrap gap-8 text-sm font-medium text-black uppercase">
					{navLinks.map((link) => (
						<NavLink
							key={link.href}
							link={link}
							component={Link}
							current={pathname}
						/>
					))}
				</ul>
			</nav>
		</header>
	);
}

const NavLink = ({ component: Link, link, current }: any) => {
	const pathname = current;
	return (
		<li key={link.href}>
			<Link
				href={link.href}
				className={
					pathname === link.href
						? 'relative before:absolute before:w-full before:h-0.5 before:bg-primary before:-bottom-2'
						: undefined
				}
			>
				{link.title}
			</Link>
		</li>
	);
};
