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

	const product = parsedRequest.data;
	const createdProduct = await db.product.create({
		data: { ...product },
	});

	return json({ data: { ...createdProduct } }, { status: 201 });
}
