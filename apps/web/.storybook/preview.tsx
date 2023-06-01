import React from 'react';
import type { Preview } from '@storybook/react';
import '../app/globals.css';
import './style.css';
import { EnvironmentContext } from 'ui/env';
import { usePathname } from 'next/navigation';
import { Image, Link } from '../lib/EnvComponents';

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
		backgrounds: {
			default: 'dark',
		},
	},
	decorators: [
		(Story) => (
			<EnvironmentContext.Provider
				value={{
					Image: Image,
					Link: Link,
					usePathname: usePathname,
				}}
			>
				<div className="p-4">
					<Story />
				</div>
			</EnvironmentContext.Provider>
		),
	],
};

export default preview;
