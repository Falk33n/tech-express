import { getMarkdown } from '$lib/server/utils';
import { addEnvironmentVariablesToMarkdown } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request, url }) => {
	const cookiePolicy = await getMarkdown(url, request, 'cookie-policy.md');

	const policyWithEnvironmentVariablesAdded =
		addEnvironmentVariablesToMarkdown(cookiePolicy);

	return {
		cookiePolicy: policyWithEnvironmentVariablesAdded,
	};
};
