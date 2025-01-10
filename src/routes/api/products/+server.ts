import { productsAddSchema } from '$schemas/api/products';
import { db } from '$server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const parsedRequest = productsAddSchema.safeParse({
			...(await request.json()),
		});

		if (parsedRequest.error) {
			return json(parsedRequest.error.errors, {
				status: 400,
				statusText: 'Bad Request',
			});
		}

		const { categories, imageUrls, ...restData } = parsedRequest.data;

		const response = await db.product.create({
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
			include: {
				categories: true,
				imageUrls: true,
			},
		});

		return json(response, {
			status: 201,
			statusText: 'Created',
		});
	} catch (err) {
		if (err instanceof Error) {
			await db.errorLog.create({
				data: {
					message: err.message,
					stackTrace: err.stack,
					httpMethod: 'POST',
					path: '/api/products',
				},
			});
		} else {
			await db.errorLog.create({
				data: {
					message: 'Unknown error while creating a new product',
					httpMethod: 'POST',
					path: '/api/products',
				},
			});
		}

		throw err;
	}
};
