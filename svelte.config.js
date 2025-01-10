import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			'$src/*': './src/*',
			'$utils': './src/lib/utils.ts',
			'$types': './src/lib/types.ts',
			'$components/*': './src/lib/components/*',
			'$hooks/*': './src/lib/hooks/*',
			'$server/*': './src/lib/server/*',
		},
	},
};
