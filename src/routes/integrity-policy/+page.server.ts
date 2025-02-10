import { getMarkdown } from '$lib/server/utils';
import { addEnvironmentVariablesToMarkdown } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request, url }) => {
	const integrityPolicy = await getMarkdown(
		url,
		request,
		'integrity-policy.md',
	);

	const policyWithEnvironmentVariablesAdded =
		addEnvironmentVariablesToMarkdown(integrityPolicy);

	return {
		integrityPolicy: policyWithEnvironmentVariablesAdded,
	};
};
