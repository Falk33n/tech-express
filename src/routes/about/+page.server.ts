import { getMarkdown } from '$lib/server/utils';
import { addEnvironmentVariablesToMarkdown } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request, url }) => {
	const about = await getMarkdown(url, request, 'about.md');

	const aboutWithEnvironmentVariablesAdded =
		addEnvironmentVariablesToMarkdown(about);

	return {
		about: aboutWithEnvironmentVariablesAdded,
	};
};
