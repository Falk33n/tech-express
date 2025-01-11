import { productDeleteSchema } from '$schemas/api/products';
import { db } from '$server/db';
import { handleError } from '$server/utils';
import { json } from '@sveltejs/kit';

export async function productDELETE(request: Request) {
	try {
		const parsedRequest = productDeleteSchema.safeParse({
			...(await request.json()),
		});

		if (!parsedRequest.success) {
			return json(
				{ success: false, errors: parsedRequest.error.errors },
				{ status: 400, statusText: 'Bad Request' },
			);
		}

		await db.product.delete({
			where: { id: parsedRequest.data.id },
			include: { categories: true, imageUrls: true },
		});

		return json(
			{
				success: true,
				message: 'Product deleted successfully',
			},
			{ status: 200, statusText: 'OK' },
		);
	} catch (err) {
		return handleError({
			error: err,
			responseMessage: 'Failed to delete product',
			httpMethod: 'DELETE',
			path: '/api/products',
		});
	}
}
