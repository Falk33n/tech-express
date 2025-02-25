import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const productId = params.id;
	return {
		productId,
	};
};
