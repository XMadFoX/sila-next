'use client';

import React from 'react';
import { Button } from '../general';
import { usePathname } from 'next/navigation';

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

export function Header({ image: Image, link: NextLink }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="flex flex-col mx-auto w-full h-28 max-w-[1400px]">
      <nav>
        <ul className="flex items-center">
          <NextLink href="/">
            <Image src="/logo.png" alt="logo" width={64} height={64} />
          </NextLink>
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
      <nav className="mx-auto mt-7">
        <ul className="flex flex-wrap gap-8 text-sm font-medium text-black uppercase">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              link={link}
              component={NextLink}
              current={pathname}
            />
          ))}
        </ul>
      </nav>
    </header>
  );
}

const Link = ({ component: Link, link, current }: any) => {
  const pathname = current;
  return (
    <li key={link.href}>
      <Link
        href={link.href}
        className={
          pathname === link.href &&
          'relative before:absolute before:w-full before:h-0.5 before:bg-primary before:-bottom-2'
        }
      >
        {link.title}
      </Link>
    </li>
  );
};
