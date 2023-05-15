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
			colors: {
				black: '#454444',
				'dark-grey': '#A3A2A2',
				grey: '#EFEEEE',
				blue: '#2E89DC',
				error: '#CB1212',
				green: '#73E63D',
				primary: '#2E89DC',
				'primary-a': '#2E89DC',
				'primary-b': '#4361EE',
				'primary-c': '#FB6F92',
			},
		},
	},
	plugins: [],
};
