<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle,
	} from '$lib/components/ui/card';
	import { PlusIcon, ShoppingCartIcon } from '$lib/components/ui/icons';
	import { Link } from '$lib/components/ui/link';
	import { addToCart } from '$lib/shopping-cart-state.svelte';
	import type { Product } from '$lib/types';
	import { toast } from 'svelte-sonner';

	type Props = {
		id: string;
		href: string;
		src: string;
		alt: string;
		name: string;
		price: number;
		quantity: number;
	};

	let { id, quantity, href, src, alt, name, price }: Props = $props();

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

<div class="relative">
	<Link
		{href}
		class="transition-transform hover:scale-105 focus-visible:scale-105"
	>
		<Card>
			<CardHeader>
				<figure>
					<img
						{src}
						{alt}
						class="h-48 w-full rounded-lg object-cover"
						draggable={false}
						loading="lazy"
					/>
				</figure>
			</CardHeader>
			<CardContent>
				<CardTitle class="mb-2 text-base">{name}</CardTitle>
				<p
					aria-label={`This product costs $ ${price}`}
					class="text-primary text-sm font-bold"
				>
					${price}
				</p>
			</CardContent>
		</Card>
	</Link>
	<Button
		size="icon"
		class="absolute right-6 bottom-6 size-8"
		aria-label="Add product to cart"
		onclick={() => addProductToCart()}
	>
		<span
			aria-hidden="true"
			class="relative flex size-full items-center justify-center"
		>
			<ShoppingCartIcon
				class="mt-1 mr-1.5 scale-100"
				aria-hidden
			/>
			<PlusIcon
				class="absolute top-px right-0.5 scale-75"
				aria-hidden
			/>
		</span>
	</Button>
</div>
