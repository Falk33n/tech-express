import { productAddSchema } from '$schemas/api/products';
import { db } from '$server/db';
import { handleError } from '$server/utils';
import { json } from '@sveltejs/kit';

export async function productPOST(request: Request) {
	try {
		const parsedRequest = productAddSchema.safeParse({
			...(await request.json()),
		});

		if (!parsedRequest.success) {
			return json(
				{ success: false, errors: parsedRequest.error.errors },
				{ status: 400, statusText: 'Bad Request' },
			);
		}

		const { categories, imageUrls, ...restData } = parsedRequest.data;

		return json(
			{
				success: true,
				data: await db.product.create({
					data: {
						categories: {
							connectOrCreate: categories.map((name) => ({
								where: { name },
								create: { name },
							})),
						},
						imageUrls: {
							connectOrCreate: imageUrls.map((url) => ({
								where: { url },
								create: { url },
							})),
						},
						...restData,
					},
					include: { categories: true, imageUrls: true },
				}),
			},
			{ status: 201, statusText: 'Created' },
		);
	} catch (err) {
		return handleError({
			error: err,
			responseMessage: 'Failed to create a new product',
			httpMethod: 'POST',
			path: '/api/products',
		});
	}
}
