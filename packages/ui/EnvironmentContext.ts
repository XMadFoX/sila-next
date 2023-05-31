'use client';

import { createContext } from 'react';

export interface LinkProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export interface EnvironmentContextValue {
	Link: React.FC<LinkProps>;
	Image: React.FC<React.ImgHTMLAttributes<HTMLImageElement>>;
	usePathname: () => string;
}
export const EnvironmentContext = createContext<EnvironmentContextValue>({
	Link: () => null,
	Image: () => null,
	usePathname: () => '',
});
