'use client';

import { usePathname } from 'next/navigation';
import React from 'react';
import { EnvironmentContext } from '../env';
import { Button } from '../general';
import { footerLinks } from './navLinks';

export function Footer() {
	const pathname = usePathname();
	const { Link, Image } = React.useContext(EnvironmentContext);

	return (
		<footer className="flex flex-col items-center mt-32 w-full min-w-max text-white rounded-t-[40px] bg-primary">
			<div className="flex justify-center pb-7 w-full uppercase border-b border-opacity-50 max-w-[1400px]">
				<div className="mt-16 mr-auto">
					<Image
						src="/logo_white_outline.png"
						alt="logo"
						width={64}
						height={64}
					/>
					<h2 className="mt-2 text-xl font-medium">
						foot Проект движения
						<br />
						<span className="text-3xl font-bold">Сила Любви</span>
					</h2>
				</div>
				<nav className="mt-auto">
					<ul className="gap-x-20 columns-2">
						{footerLinks.map((link) => (
							<li key={link.href}>
								<Link href={link.href}>{link.title}</Link>
							</li>
						))}
					</ul>
				</nav>
				<Button intent="clear" className="mt-auto ml-auto uppercase">
					Обратная связь
				</Button>
				{pathname === '/' && (
					<Button
						intent="primary"
						size={null}
						className="p-3 mt-9 mb-auto text-sm uppercase border aspect-square"
					>
						Поддержать
					</Button>
				)}
			</div>
			<div className="flex gap-4 items-center pt-7 pb-16 w-full max-w-[1400px]">
				<Link className="ml-auto" href="#">
					Пользовательское соглашение
				</Link>
				<Link href="#">Политика конфиденциальности</Link>
				<Link href="#">
					<Image
						src="/icons/telegram_solid_white.svg"
						alt="Telegram"
						height={22}
						width={22}
					/>
				</Link>
				<Link href="#">
					<Image
						src="/icons/youtube_solid_white.svg"
						alt="YouTube"
						height={22}
						width={22}
					/>
				</Link>
			</div>
		</footer>
	);
}
