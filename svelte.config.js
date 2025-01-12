import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			'$src': './src',
			'$src/*': './src/*',
			'$lib': './src/lib',
			'$lib/*': './src/lib/*',
		},
	},
};
