import { NODE_ENV } from '$env/static/private';
import { emailSchema } from '$lib/schemas';
import { db } from '$lib/server/db';
import type { Product } from '$lib/types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { LayoutServerLoad } from './$types';

async function getSortedProducts(request: Request, url: URL) {
	const response = await fetch(`${url.origin}/api/products`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	});

	if (!response.ok) {
		if (NODE_ENV !== 'development') {
			await db.errorLog.create({
				data: {
					method: request.method,
					pathName: url.pathname,
					message: `Error fetching products: ${response.statusText}`,
					status: response.status,
				},
			});
		}

		return [];
	}

	const products: { data: Product[] } = await response.json();
	const sortedProducts = products.data.sort((current, next) => {
		return (
			new Date(next.createdAt).getTime() - new Date(current.createdAt).getTime()
		);
	});

	return sortedProducts;
}

export const load: LayoutServerLoad = async ({ request, url }) => {
	return {
		products: await getSortedProducts(request, url),
		newsletterForm: await superValidate(zod(emailSchema)),
	};
};
