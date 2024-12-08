/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		screens: {
			lg: '1024px',
			sm: '540px',
		},
		extend: {
			colors: {
				'almost-white': '#fcf9f2',
				'medium-gray': '#d7d4ce',
				'all-black': '#000000',
				'medium-yellow': '#fcda45',
				'black-alpha': {
					10: 'rgba(0, 0, 0, 0.1)',
					5: 'rgba(0, 0, 0, 0.05)',
				},
			},
		},
	},
	plugins: [],
}
