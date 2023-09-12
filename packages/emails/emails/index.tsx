import { Button } from '@react-email/button';
import { Html } from '@react-email/html';
import { Tailwind } from '@react-email/tailwind';
import * as React from 'react';
import config from 'tailwind-config';
// import 'web/app/global.css';
import './global.css';

export default function Email() {
	return (
		<Html>
			<Tailwind config={config as any}>
				{/* <style> */}
				{/* 	:root { */}
				{/* 		--error: #cb1212; */}
				{/* }</style> */}
				{/* {JSON.stringify(config.theme)} */}
				<Button
					pX={20}
					pY={12}
					href="https://example.com"
					style={{ background: 'red', color: '#fff' }}
				>
					Click me
				</Button>
				<Button className="p-4 bg-green-500 bg-error">tailwind</Button>
			</Tailwind>
		</Html>
	);
}
