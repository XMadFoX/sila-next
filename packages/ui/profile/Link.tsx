'use client';

import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { cn } from '../lib';

export default function Link({ title, href }: { title: string; href: string }) {
	const pathname = usePathname();
	const isActive = pathname === href;
	return (
		<NextLink
			href={href}
			className={cn(
				'transition duration-300',
				'relative before:h-0.5 before:w-full before:z-10 before:bg-primary before:block before:absolute before:left-0 before:-bottom-[15px]',
				!isActive && 'grayscale before:h-px brightness-150'
			)}
		>
			{title}
		</NextLink>
	);
}
