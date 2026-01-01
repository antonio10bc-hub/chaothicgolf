/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				neobase: '#F9F8F4',
				neodark: '#2D2E2D',
				neogreen: '#557355',
				neoaccent: '#F8991D',
			},
			boxShadow: {
				neo: '4px 4px 0px 0px #2D2E2D',
				'neo-lg': '8px 8px 0px 0px #2D2E2D',
			},
		},
	},
	plugins: [],
};
