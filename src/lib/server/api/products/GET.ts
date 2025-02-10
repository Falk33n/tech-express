import { db } from '$lib/server/db';
import type { ProductCategory } from '$lib/types';
import { error, json } from '@sveltejs/kit';

async function getSingleProduct(id: string) {
	const singleProduct = await db.product.findUnique({
		where: { id },
	});

	if (!singleProduct) {
		error(404, 'Product not found');
	}

	return json({ data: { ...singleProduct } }, { status: 200 });
}

async function getProductsInCategory(category: ProductCategory) {
	const productsInCategory = await db.product.findMany({
		where: { category },
	});

	if (productsInCategory.length === 0) {
		error(404, `Products not found in the specified category: ${category}`);
	}

	return json({ data: productsInCategory }, { status: 200 });
}

async function getAllProducts() {
	const allProducts = await db.product.findMany();

	if (allProducts.length === 0) {
		error(404, 'No products found');
	}

	return json({ data: allProducts }, { status: 200 });
}

export async function productGET(category: string | null, id?: string) {
	if (id) {
		return getSingleProduct(id);
	} else if (category) {
		return getProductsInCategory(category as ProductCategory);
	}

	return getAllProducts();
}
