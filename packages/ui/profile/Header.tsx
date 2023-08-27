import Image from 'next/image';
import React from 'react';
import { getAvatarUrl } from './avatar';

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
		<div className="flex items-center">
			<Image src={getAvatarUrl(img, id)} alt="" width={100} height={100} />
			<h1 className="text-3xl font-medium">{name}</h1>
		</div>
	);
}
