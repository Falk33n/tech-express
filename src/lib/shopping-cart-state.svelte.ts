import type { Product } from '$lib/types';

type SingleProductGlobalState = Omit<
	Product,
	'description' | 'category' | 'createdAt' | 'updatedAt'
> & { totalInCart?: number };

export type ProductGlobalState = {
	value: SingleProductGlobalState[];
};

function loadCartFromLocalStorage(): ProductGlobalState {
	if (typeof localStorage !== 'undefined') {
		const storedCart = localStorage.getItem('shoppingCart');
		if (storedCart) {
			return JSON.parse(storedCart);
		}
	}
	return { value: [] };
}

export const productsInShoppingCart = $state<ProductGlobalState>(
	loadCartFromLocalStorage(),
);

function saveCartToLocalStorage() {
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem(
			'shoppingCart',
			JSON.stringify(productsInShoppingCart),
		);
	}
}

export function addToCart(product: SingleProductGlobalState) {
	const existingProduct = productsInShoppingCart.value.find(
		(p) => p.id === product.id,
	);

	if (existingProduct) {
		existingProduct.totalInCart = (existingProduct.totalInCart || 0) + 1;
	} else {
		productsInShoppingCart.value.push({ ...product, totalInCart: 1 });
	}

	saveCartToLocalStorage();
}

export function removeFromCart(productId: string) {
	const productIndex = productsInShoppingCart.value.findIndex(
		(product) => product.id === productId,
	);

	if (productIndex !== -1) {
		const product = productsInShoppingCart.value[productIndex];

		if (product.totalInCart && product.totalInCart > 1) {
			product.totalInCart -= 1;
		} else {
			productsInShoppingCart.value.splice(productIndex, 1);
		}

		saveCartToLocalStorage();
	}
}
