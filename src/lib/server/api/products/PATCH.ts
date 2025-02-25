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
	const parsedRequest = productUpdateSchema.safeParse({
		...(await request.json()),
	});

	if (!parsedRequest.success) {
		error(400, 'Invalid request body');
	}

	const product = await db.product.findUnique({
		where: { id: parsedRequest.data.id },
	});

	if (!product) {
		error(404, 'Product not found');
	}

	const { id, ...restProduct } = parsedRequest.data;

	const updatedProduct = await db.product.update({
		where: { id },
		data: { ...restProduct },
	});

	return json({ data: { ...updatedProduct } }, { status: 200 });
}
