import { productUpdateSchema } from '$schemas/api/products';
import { db } from '$server/db';
import { handleError } from '$server/utils';
import { json } from '@sveltejs/kit';

export async function productPATCH(request: Request) {
	try {
		const parsedRequest = productUpdateSchema.safeParse({
			...(await request.json()),
		});

		if (!parsedRequest.success) {
			return json(
				{ success: false, errors: parsedRequest.error.errors },
				{ status: 400, statusText: 'Bad Request' },
			);
		}

		const { id, categories, imageUrls, ...restData } = parsedRequest.data;

		return json(
			{
				success: true,
				data: await db.product.update({
					where: { id },
					data: {
						...(categories &&
							categories.length > 0 && {
								categories: { connect: categories.map((name) => ({ name })) },
							}),
						...(imageUrls &&
							imageUrls.length > 0 && {
								imageUrls: { connect: imageUrls.map((url) => ({ url })) },
							}),
						...restData,
					},
					include: { categories: true, imageUrls: true },
				}),
			},
			{ status: 200, statusText: 'OK' },
		);
	} catch (err) {
		return handleError({
			error: err,
			responseMessage: 'Failed to update product',
			httpMethod: 'PATCH',
			path: '/api/products',
		});
	}
}
