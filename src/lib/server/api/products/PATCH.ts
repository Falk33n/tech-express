import { productSchema, uuidSchema } from '$lib/schemas';
import { db } from '$lib/server/db';
import { error, json } from '@sveltejs/kit';

const productUpdateSchema = productSchema
	.omit({
		id: true,
		createdAt: true,
		updatedAt: true,
	})
	.partial()
	.extend(uuidSchema.shape);

export async function productPATCH(request: Request) {
	const parsedRequest = await productUpdateSchema.safeParseAsync({
		...(await request.json()),
	});

	if (!parsedRequest.success) {
		error(400, 'Invalid request body');
	}

	const product = await db.product.findUnique({
		where: { id: parsedRequest.data.id },
		include: { categories: true, imageUrls: true },
	});

	if (!product) {
		error(404, 'Product not found');
	}

	/* eslint-disable @typescript-eslint/no-unused-vars */
	const {
		id,
		categories,
		imageUrls,
		createdAt: _,
		updatedAt: __,
		...restProduct
	} = product;
	/* eslint-enable @typescript-eslint/no-unused-vars */

	const updatedProduct = await db.product.update({
		where: { id },
		data: {
			...(categories &&
				categories.length > 0 && {
					categories: {
						connectOrCreate: categories.map(({ name }) => ({
							where: { name },
							create: { name },
						})),
					},
				}),
			...(imageUrls &&
				imageUrls.length > 0 && {
					imageUrls: {
						connectOrCreate: imageUrls.map(({ url }) => ({
							where: { url },
							create: { url },
						})),
					},
				}),
			...restProduct,
		},
		include: { categories: true, imageUrls: true },
	});

	const {
		categories: updatedCategories,
		imageUrls: updatedImageUrls,
		...restUpdatedProduct
	} = updatedProduct;

	return json(
		{
			data: {
				categories: updatedCategories.map(({ name }) => name),
				imageUrls: updatedImageUrls.map(({ url }) => url),
				...restUpdatedProduct,
			},
		},
		{ status: 200 },
	);
}
