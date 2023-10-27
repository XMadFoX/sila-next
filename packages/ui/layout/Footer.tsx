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
		<>
			<div className="mt-auto" />
			<footer className="flex flex-col items-center mt-32 w-full text-white rounded-t-[40px] bg-primary">
				<div className="flex flex-col px-2 pb-7 w-full uppercase border-b border-opacity-50 md:justify-center xl:flex-row xl:px-0 align-center max-w-[1400px]">
					<div className="mx-auto mt-16 lg:mr-auto">
						<Image
							src="/logo_white_outline.png"
							alt="logo"
							width={64}
							height={64}
						/>
						<h2 className="mt-2 text-xl font-medium whitespace-pre-wrap">
							Проект движения
							<br className="sm:hidden xl:block" />
							<span className="text-3xl font-bold sm:ml-2 xl:ml-0">
								Сила Любви
							</span>
						</h2>
					</div>
					<nav className="mx-auto mt-auto xl:mx-o">
						<ul className="gap-x-20 md:columns-2">
							{footerLinks.map((link) => (
								<li key={link.href}>
									<Link href={link.href}>{link.title}</Link>
								</li>
							))}
						</ul>
					</nav>
					<div className="flex items-center md:mx-auto lg:ml-auto">
						<Button intent="clear" className="mt-auto ml-auto uppercase">
							Обратная связь
						</Button>
						{pathname === '/' && (
							<Button
								intent="primary"
								size={null}
								className="p-3 mx-auto mt-9 mb-auto text-sm uppercase border aspect-square"
							>
								Поддержать
							</Button>
						)}
					</div>
				</div>
				<div className="flex flex-row flex-wrap gap-4 items-center pt-7 pb-16 w-full max-w-sm xl:max-w-[1400px]">
					<Link className="w-full md:w-auto xl:ml-auto" href="#">
						Пользовательское соглашение
					</Link>
					<Link className="w-full md:w-auto flex-initia" href="#">
						Политика конфиденциальности
					</Link>
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
		</>
	);
}
