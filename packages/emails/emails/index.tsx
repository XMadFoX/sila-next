import { Button } from '@react-email/button';
import { Html } from '@react-email/html';
import { Tailwind } from '@react-email/tailwind';
import * as React from 'react';
import config from 'tailwind-config';

const tailwindConfig = {
	...config,
	theme: {
		extend: {},
	},
};

export default function Email() {
	return (
		<Tailwind config={tailwindConfig as any}>
			<Html>
				<Button
					href="https://google.com"
					className="p-4 text-white bg-blue-900"
				>
					Google
				</Button>
			</Html>
		</Tailwind>
	);
}
