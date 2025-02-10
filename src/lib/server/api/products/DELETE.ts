import { uuidSchema } from '$lib/schemas';
import { db } from '$lib/server/db';
import { error, json } from '@sveltejs/kit';

export async function productDELETE(request: Request) {
	const parsedRequest = await uuidSchema.safeParseAsync({
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

	await db.product.delete({
		where: { id: product.id },
	});

	return json({ message: 'Product deleted successfully' }, { status: 200 });
}
