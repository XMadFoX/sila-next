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
		},
		colors: {
			transparent: 'transparent',
			white: 'var(--white)',
			black: 'var(--black)',
			'dark-grey': 'var(--dark-grey)',
			grey: 'var(--grey)',
			blue: 'var(--blue)',
			error: 'var(--error)',
			green: 'var(--green)',
			'primary-a': 'var(--primary-start)',
			'primary-b': 'var(--primary-via)',
			'primary-c': 'var(--primary-end)',
		},
		fontSize: {
			'5xl': ['5.125rem'], // 82px
			'4xl': ['3rem'], // 48px
			'3xl': ['2.25rem'], // 36px
			'2xl': ['1.75rem'], // 28px
			xl: ['1.25rem'], // 20px
			lg: ['1.125rem'], // 18px
			base: ['1rem'], // 16px
			sm: ['0.875rem'], // 14px
		},
		fontWeight: {
			normal: 400,
			medium: 500,
			bold: 700,
		},
		fontFamily: {
			sans: ['var(--font-inter)', 'sans-serif'],
		},
	},
	plugins: [],
};
