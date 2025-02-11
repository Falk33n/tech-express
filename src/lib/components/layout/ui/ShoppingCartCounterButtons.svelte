<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { addToCart, removeFromCart } from '$lib/shopping-cart-state.svelte';
	import type { Product } from '$lib/types';

	type Props = Omit<
		Product,
		'description' | 'category' | 'createdAt' | 'updatedAt'
	> & { totalInCart?: number };

	let {
		quantity,
		price,
		name,
		id,
		imageUrl,
		imageDescription,
		totalInCart,
	}: Props = $props();

	function tryAddToCart() {
		if (totalInCart && totalInCart < quantity) {
			addToCart({
				id,
				imageDescription,
				imageUrl,
				name,
				price,
				quantity,
				totalInCart,
			});
		}
	}
</script>

<Button
	size="icon"
	variant="outline"
	class="hover:bg-primary size-6"
	aria-label="Decrease quantity by one"
	onclick={() => removeFromCart(id)}
>
	-
</Button>
<span>{totalInCart}</span>
<Button
	size="icon"
	variant="outline"
	aria-label="Increase quantity by one"
	class="hover:bg-primary size-6"
	disabled={totalInCart && totalInCart >= quantity ? true : false}
	aria-disabled={totalInCart && totalInCart >= quantity ? true : false}
	onclick={() => tryAddToCart()}
>
	+
</Button>
