/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				'neon-green': '#37ff47',
				'primary-blue': '#4834d4',
				'cream-50': '#f9f9f7',
				'cream-100': '#f4f3ef',
				'cream-200': '#efeee8',
				'cream-300': '#eae8e0',
				'cream-400': '#e5e3d9',
			}
		},
		fontFamily: {
			"helveticablack": "HelveticaNeueCE-Black",
			"helvetica75": "HelveticaNeueCe70-Bold",
			"helvetica": "Helvetica",
			"chiquita": "Chiquita",
			"anderson": "AndersonGrotesk",
			"space": "Space Grotesk",
			"playfair": ["Playfair Display", "serif"]
		},
		screens: {
			'xxs': '380px',
			'xs': '540px',
			'sm': '640px',
			'md': '768px',
			'2md': '940px',
			'lg': '1024px',
			'2lg': '1200px',
			'xl': '1280px',
			'2xl': '1400px',
			'3xl': '1536px',
			'': '',
		},
	},
	variants: {
		extend: {
			text: ['disabled']
		}
	},
	plugins: [
		function ({ addVariant }) {
			addVariant('children', '& > *');
		}
	],
};
