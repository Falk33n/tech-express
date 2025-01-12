import { db } from '$lib/server/db';
import { error, json } from '@sveltejs/kit';

async function getSingleProduct(id: string) {
	const singleProduct = await db.product.findUnique({
		where: { id },
		include: { categories: true, imageUrls: true },
	});

	if (!singleProduct) {
		error(404, 'Product not found');
	}

	const { categories, imageUrls, ...restProduct } = singleProduct;

	return json(
		{
			data: {
				categories: categories.map(({ name }) => name),
				imageUrls: imageUrls.map(({ url }) => url),
				...restProduct,
			},
		},
		{ status: 200 },
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
		error(404, `Products not found in the specified category: ${category}`);
	}

	return json(
		{
			data: productsInCategory.map(
				({ categories, imageUrls, ...restProducts }) => ({
					categories: categories.map(({ name }) => name),
					imageUrls: imageUrls.map(({ url }) => url),
					...restProducts,
				}),
			),
		},
		{ status: 200 },
	);
}

async function getAllProducts() {
	const allProducts = await db.product.findMany({
		include: { categories: true, imageUrls: true },
	});

	if (allProducts.length === 0) {
		error(404, 'No products found');
	}

	return json(
		{
			data: allProducts.map(({ categories, imageUrls, ...restProducts }) => ({
				categories: categories.map(({ name }) => name),
				imageUrls: imageUrls.map(({ url }) => url),
				...restProducts,
			})),
		},
		{ status: 200 },
	);
}

export async function productGET(category: string | null, id?: string) {
	if (id) {
		return getSingleProduct(id);
	} else if (category) {
		return getProductsInCategory(category);
	}

	return getAllProducts();
}
