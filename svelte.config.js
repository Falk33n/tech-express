import vercelAdapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: vitePreprocess(),
	kit: {
		adapter: vercelAdapter(),
		alias: {
			'$src': './src',
			'$src/*': './src/*',
			'$lib': './src/lib',
			'$lib/*': './src/lib/*',
		},
	},
};
