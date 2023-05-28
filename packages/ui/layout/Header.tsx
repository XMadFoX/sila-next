import React from 'react';
import { Button } from '../general';

interface HeaderProps {
	image: React.ElementType;
	link: React.ElementType;
}

export const navLinks = [
	{
		title: 'Культурные мероприятия',
		href: '/events',
	},
	{ title: 'Психологическая поддержка', href: '/support' },
	{
		title: 'Деловое сотрудничество',
		href: '/business',
	},
	{ title: 'О проекте', href: '/about' },
	{ title: 'Блог', href: '/blog' },
];

export function Header({ image: Image, link: Link }: HeaderProps) {
	return (
		<header className="flex flex-col max-w-[1400px]">
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
					<Button size={null} className="px-8 ml-auto h-12 text-sm uppercase">
						Войти
					</Button>
				</ul>
			</nav>
			<nav className="mx-auto">
				<ul className="flex gap-8 text-sm font-medium text-black uppercase">
					{navLinks.map((link) => (
						<li key={link.href}>
							<Link href={link.href}>{link.title}</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}
