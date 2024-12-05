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
				'almost-white': 'linear-gradient(to right, #fcf9f2 0%, #fcf9f2 100%)',
				'medium-gray': 'linear-gradient(to right, #d7d4ce 0%, #d7d4ce 100%)',
				'all-black': '#000000',
				'medium-yellow': '#fcda45',
			},
		},
	},
	plugins: [],
}
