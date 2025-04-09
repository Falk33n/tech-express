<script lang="ts">
	import { page } from '$app/state';
	import { addToCart } from '$lib/shopping-cart-state.svelte';
	import type { GlobalLayoutProps, Product } from '$lib/types';
	import { getContext } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { Badge } from '../ui/badge';
	import { Button } from '../ui/button';
	import { SectionHeading } from '../ui/typography';

	let { products }: GlobalLayoutProps = getContext('global-layout');

	const product = $derived(
		products.filter((product) => product.id === page.params.id)[0],
	);

	type ShoppingCartProductProps = Omit<
		Product,
		'description' | 'createdAt' | 'updatedAt'
	>;

	const shoppingCartConfiguredProduct: ShoppingCartProductProps = $derived({
		id: product.id,
		imageUrl: product.imageUrl,
		imageDescription: product.imageDescription,
		name: product.name,
		price: product.price,
		quantity: product.quantity,
		category: product.category,
	});

	function addProductToCart() {
		addToCart(shoppingCartConfiguredProduct);
		toast.info('Added', {
			description: `${product.name} has been added to the cart.`,
		});
	}
</script>

<div
	class="flex w-full justify-between rounded-md border p-8 shadow-sm max-md:flex-col md:gap-14 lg:gap-24 xl:gap-36"
>
	<div class="flex flex-[50%] flex-col">
		<SectionHeading class="mb-6">{product.name}</SectionHeading>
		<p class="truncate text-pretty">{product.description}</p>
	</div>
	<div class="flex-[50%] max-md:mt-8">
		<figure class="relative">
			<Badge class="absolute top-6 right-6 capitalize">{product.category}</Badge
			>
			<img
				src={product.imageUrl}
				alt={product.imageDescription}
				class="h-96 w-full rounded-lg border object-contain py-4 shadow-sm"
				draggable={false}
				loading="lazy"
			/>
		</figure>
		<Button
			onclick={() => addProductToCart()}
			class="my-4 h-10 w-full"
		>
			Add to cart
		</Button>
		<div class="flex items-center justify-between gap-2">
			<p
				aria-label={`This product costs $${product.price}`}
				class="text-primary font-bold"
			>
				Price: ${product.price}
			</p>
			<p class="text-primary font-bold">
				Stock: {product.quantity}
			</p>
		</div>
	</div>
</div>
