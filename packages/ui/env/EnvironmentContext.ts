'use client';

import { createContext } from 'react';

export interface LinkProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
}

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	src: string;
	alt: string;
	width: number;
	height: number;
	placeholder?: 'blur' | 'empty';
}

export interface EnvironmentContextValue {
	Link: React.FC<LinkProps>;
	Image: React.FC<ImageProps>;
	usePathname: () => string;
}
export const EnvironmentContext = createContext<EnvironmentContextValue>({
	Link: () => null,
	Image: () => null,
	usePathname: () => '',
});
