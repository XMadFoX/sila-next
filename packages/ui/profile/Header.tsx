import Image from 'next/image';
import React from 'react';
import { getAvatarUrl } from './avatar';
import Link from './Link';

const menuLinks = [
	{
		title: 'Профиль',
		href: '/me',
	},
	{
		title: 'Мои объявления',
		href: '/me/posts',
	},
];

export default function Header({
	id,
	img,
	name,
}: {
	id: string;
	img: string | null;
	name: string;
}) {
	return (
		<>
			<div className="flex items-center">
				<Image src={getAvatarUrl(img, id)} alt="" width={100} height={100} />
				<h1 className="text-3xl font-medium">{name}</h1>
			</div>
			<ul className="flex gap-6 py-3 mb-14 border-b border-dark-grey">
				{menuLinks.map((link) => (
					<li key={link.href}>
						<Link title={link.title} href={link.href} />
					</li>
				))}
			</ul>
		</>
	);
}
