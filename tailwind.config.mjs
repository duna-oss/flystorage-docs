import colors from 'tailwindcss/colors.js';
import starlightPlugin from '@astrojs/starlight-tailwind';

// Generated color palettes
const accent = colors.sky//{ 200: '#7fdcd2', 600: '#007d75', 900: '#003b37', 950: '#002b28' };
const gray = colors.gray;

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: { accent, gray },
		},
		fontFamily: {
			// Your preferred text font. Starlight uses a system font stack by default.
			sans: ['Lato'],
			// // Your preferred code font. Starlight uses system monospace fonts by default.
			// mono: ['"IBM Plex Mono"'],
		},
	},
	plugins: [starlightPlugin()],
};