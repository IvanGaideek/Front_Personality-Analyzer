/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		screens: {
			lg: '1024px',
			md: '768px',
			sm: '540px',
		},
		extend: {
			colors: {
				'almost-white': '#fcf9f2',
				'medium-gray': '#d7d4ce',
				'all-black': '#000000',
				'medium-yellow': '#fcda45',
				'yellow-alpha': {
					80: 'rgba(252, 218, 69, 0.82)',
				},
				'black-alpha': {
					90: 'rgba(0, 0, 0, 0.9)',
					10: 'rgba(0, 0, 0, 0.1)',
					5: 'rgba(0, 0, 0, 0.05)',
					70: 'rgba(0, 0, 0, 0.7)',
				},
			},
			keyframes: {
				typing: {
					'0%': {
						width: '0%',
						visibility: 'hidden',
					},
					'90%': {
						width: '100%',
						visibility: 'visible', // Ensure visibility remains 'visible' during the hold
					},
					'100%': {
						width: '100%',
					},
				},
				blink: {
					'50%': {
						borderColor: 'transparent',
					},
					'100%': {
						borderColor: 'white',
					},
				},
			},
			animation: {
				typing: 'typing 4s steps(30) infinite alternate, blink .7s infinite',
			},
		},
	},
	plugins: [],
}
