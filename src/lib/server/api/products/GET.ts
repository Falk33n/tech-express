import { db } from '$server/db';
import { handleError } from '$server/utils';
import { json } from '@sveltejs/kit';

async function getSingleProduct(id: string) {
	const singleProduct = await db.product.findUnique({
		where: { id },
		include: { categories: true, imageUrls: true },
	});

	if (!singleProduct) {
		return json(
			{ success: false, message: 'Product not found' },
			{ status: 404, statusText: 'Not Found' },
		);
	}

	return json(
		{ success: true, data: singleProduct },
		{ status: 200, statusText: 'OK' },
	);
}

async function getProductsInCategory(category: string) {
	const productsInCategory = await db.product.findMany({
		where: {
			categories: {
				some: { name: category },
			},
		},
		include: { categories: true, imageUrls: true },
	});

	if (productsInCategory.length === 0) {
		return json(
			{
				success: false,
				message: `Products not found in the specified category: ${category}`,
			},
			{ status: 404, statusText: 'Not Found' },
		);
	}

	return json(
		{ success: true, data: productsInCategory },
		{ status: 200, statusText: 'OK' },
	);
}

async function getAllProducts() {
	const allProducts = await db.product.findMany({
		include: { categories: true, imageUrls: true },
	});

	if (allProducts.length === 0) {
		return json(
			{ success: false, message: 'No products found' },
			{ status: 404, statusText: 'Not Found' },
		);
	}

	return json(
		{ success: true, data: allProducts },
		{ status: 200, statusText: 'OK' },
	);
}

export async function productGET(category: string | null, id?: string) {
	try {
		if (id) {
			return getSingleProduct(id);
		} else if (category) {
			return getProductsInCategory(category);
		}

		return getAllProducts();
	} catch (err) {
		return handleError({
			error: err,
			responseMessage: 'Failed to retrieve product(s)',
			httpMethod: 'GET',
			path: '/api/products',
		});
	}
}
