/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./stories/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'../../packages/ui/**/*.{js,ts,jsx,tsx,mdx,css}',
	],
	theme: {
		extend: {
			backgroundImage: {
				primary: 'var(--gradient)',
			},
			colors: {
				black: '#454444',
				'dark-grey': '#A3A2A2',
				grey: '#EFEEEE',
				blue: '#2E89DC',
				error: '#CB1212',
				green: '#73E63D',
				'primary-a': 'var(--primary-start)',
				'primary-b': 'var(--primary-via)',
				'primary-c': 'var(--primary-end)',
			},
		},
	},
	plugins: [],
};
