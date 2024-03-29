/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./stories/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'../../packages/ui/**/*.{js,ts,jsx,tsx,mdx,css}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
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
			border: 'hsl(var(--border))',
			input: 'hsl(var(--input))',
			ring: 'var(--ring)',
			background: 'hsl(var(--background))',
			foreground: 'hsl(var(--foreground))',
			primary: {
				DEFAULT: 'hsl(var(--primary))',
				foreground: 'hsl(var(--primary-foreground))',
			},
			secondary: {
				DEFAULT: 'hsl(var(--secondary))',
				foreground: 'hsl(var(--secondary-foreground))',
			},
			destructive: {
				DEFAULT: 'hsl(var(--destructive))',
				foreground: 'hsl(var(--destructive-foreground))',
			},
			muted: {
				DEFAULT: 'var(--background)',
				foreground: 'hsl(var(--black))',
			},
			accent: {
				DEFAULT: 'hsl(var(--accent))',
				foreground: 'hsl(var(--accent-foreground))',
			},
			popover: {
				DEFAULT: 'hsl(var(--background))',
				foreground: 'hsl(var(--popover-foreground))',
			},
			card: {
				DEFAULT: 'hsl(var(--card))',
				foreground: 'hsl(var(--card-foreground))',
			},
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
		extend: {
			backgroundImage: {
				primary: 'var(--gradient)',
				'primary-45': 'var(--gradient-45)',
			},
			flex: {
				'card-full': '0 0 100%',
				card: '0 0 200px',
			},
			keyframes: {
				overlayShow: {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
				contentShow: {
					from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
					to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
				},
			},
			animation: {
				overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
};
