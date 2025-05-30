<script lang="ts">
	import { goto } from '$app/navigation';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle,
	} from '$lib/components/ui/card';
	import { Link } from '$lib/components/ui/link';
	import { addToCart } from '$lib/shopping-cart-state.svelte';
	import type { Product } from '$lib/types';
	import { PlusIcon, ShoppingCartIcon } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	type Props = {
		id: string;
		href: string;
		src: string;
		alt: string;
		name: string;
		price: number;
		quantity: number;
		category: 'monitors' | 'phones' | 'accessories' | 'computers';
	};

	let { id, quantity, category, href, src, alt, name, price }: Props = $props();

	type ShoppingCartProductProps = Omit<
		Product,
		'description' | 'createdAt' | 'updatedAt'
	>;

	const shoppingCartConfiguredProduct: ShoppingCartProductProps = {
		id: id,
		category,
		imageUrl: src,
		imageDescription: alt,
		name: name,
		price: price,
		quantity: quantity,
	};

	function addProductToCart() {
		addToCart(shoppingCartConfiguredProduct);
		toast.info('Added', {
			description: `${name} has been added to the cart.`,
		});
	}
</script>

<div
	class="focus-within:ring-ring relative rounded-md transition-transform focus-within:scale-105 focus-within:ring-1 hover:scale-105 max-sm:w-[calc(100vw-4rem)]"
>
	<Badge class="absolute top-6 right-6 capitalize">{category}</Badge>

	<Link
		{href}
		onclick={(e) => {
			e.preventDefault();
			goto(href, { invalidateAll: true });
		}}
	>
		<Card>
			<CardHeader>
				<figure>
					<img
						{src}
						{alt}
						class="h-48 w-full rounded-lg object-contain"
						draggable={false}
						loading="lazy"
					/>
				</figure>
			</CardHeader>
			<CardContent>
				<CardTitle class="mb-2 h-max w-[80%] truncate text-base">
					{name}
				</CardTitle>
				<p
					aria-label={`This product costs $ ${price}`}
					class="text-primary flex items-center gap-2 text-sm font-bold"
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
