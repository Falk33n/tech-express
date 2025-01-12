import { productSchema } from '$lib/schemas';
import { db } from '$lib/server/db';
import { error, json } from '@sveltejs/kit';

const productAddSchema = productSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});

export async function productPOST(request: Request) {
	const parsedRequest = await productAddSchema.safeParseAsync({
		...(await request.json()),
	});

	if (!parsedRequest.success) {
		error(400, 'Invalid request body');
	}

	const { categories, imageUrls, ...restProduct } = parsedRequest.data;

	const createdProduct = await db.product.create({
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
			...restProduct,
		},
		include: { categories: true, imageUrls: true },
	});

	const {
		categories: createdCategories,
		imageUrls: createdImageUrls,
		...restCreatedProduct
	} = createdProduct;

	return json(
		{
			data: {
				categories: createdCategories.map(({ name }) => name),
				imageUrls: createdImageUrls.map(({ url }) => url),
				...restCreatedProduct,
			},
		},
		{ status: 201 },
	);
}
