'use client';

import { useContext } from 'react';
import { Button } from '../general';
import { navLinks } from './navLinks';
import { EnvironmentContext } from '../env/';
import useSession from '../useSession';
import useLogout from '../useLogout';
import { getAvatarUrl } from '../profile/avatar';
import { router } from '@sila/api';
import { useRouter } from 'next/navigation';

export function Header() {
	const { Image, Link, usePathname } = useContext(EnvironmentContext);
	const pathname = usePathname();
	const { data: session } = useSession();
	const logout = useLogout();

	const rt = useRouter();

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
					<div className="flex gap-2 items-center ml-auto">
						<Button
							intent="outlined"
							className="flex ml-auto text-black uppercase"
							bg="#fff"
							href={session ? '/me/posts/new' : '/auth/login'}
							onClick={() => {
								// console.log('click');
								// setTimeout(() => {
								// 	rt.push('/auth/login');
								// }, 100);
							}}
						>
							Создать <span className="hidden md:inline">объявление</span>
						</Button>

						{/* <p>{session.user.name}</p> */}
						{session ? (
							<>
								<Link href="/me">
									<Image
										alt=""
										src={getAvatarUrl(session.user.image, session.user.id)}
										width={44}
										height={44}
										className="w-11 h-11 rounded-full"
									/>
								</Link>
								{/* <Button */}
								{/* 	onClick={() => logout()} */}
								{/* 	className="px-8 h-11 text-sm uppercase" */}
								{/* 	size={null} */}
								{/* > */}
								{/* 	Выйти */}
								{/* </Button> */}
							</>
						) : (
							<Button
								size={null}
								href="/auth/login"
								className="flex items-center px-8 ml-auto h-11 text-sm uppercase"
							>
								Войти
							</Button>
						)}
					</div>
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
