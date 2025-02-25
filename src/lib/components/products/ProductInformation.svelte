<script lang="ts">
	import { addToCart } from '$lib/shopping-cart-state.svelte';
	import type { Product } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import { Button } from '../ui/button';
	import { SectionHeading } from '../ui/typography';

	type Props = {
		id: string;
		src: string;
		alt: string;
		name: string;
		price: number;
		quantity: number;
		description: string;
	};

	let { id, description, quantity, src, alt, name, price }: Props = $props();

	type ShoppingCartProductProps = Omit<
		Product,
		'description' | 'category' | 'createdAt' | 'updatedAt'
	>;

	const shoppingCartConfiguredProduct: ShoppingCartProductProps = {
		id,
		imageUrl: src,
		imageDescription: alt,
		name,
		price,
		quantity,
	};

	function addProductToCart() {
		addToCart(shoppingCartConfiguredProduct);
		toast.info('Added', {
			description: `${name} has been added to the cart.`,
		});
	}
</script>

<div
	class="flex w-full justify-between rounded-md border p-8 shadow-sm max-md:flex-col md:gap-14 lg:gap-24 xl:gap-36"
>
	<div class="flex flex-[50%] flex-col">
		<SectionHeading class="mb-6">{name}</SectionHeading>
		<p class="truncate text-pretty">{description}</p>
	</div>
	<div class="flex-[50%] max-md:mt-8">
		<figure>
			<img
				{src}
				{alt}
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
				aria-label={`This product costs $${price}`}
				class="text-primary font-bold"
			>
				Price: ${price}
			</p>
			<p class="text-primary font-bold">
				Stock: {quantity}
			</p>
		</div>
	</div>
</div>
