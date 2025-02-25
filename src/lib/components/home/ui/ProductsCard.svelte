<script lang="ts">
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
	import { onMount } from 'svelte';
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

	let clientSrc = $state({ value: src });
	let clientHref = $state({ value: href });

	onMount(() => {
		clientSrc.value = src;
		clientHref.value = href;
	});

	type ShoppingCartProductProps = Omit<
		Product,
		'description' | 'category' | 'createdAt' | 'updatedAt'
	>;

	const shoppingCartConfiguredProduct: ShoppingCartProductProps = {
		id,
		imageUrl: clientSrc.value,
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
	class="relative rounded-md focus-within:ring-ring focus-within:ring-1 hover:scale-105 focus-within:scale-105 transition-transform"
>
	<Link href={clientHref.value}>
		<Card>
			<CardHeader>
				<figure>
					<img
						src={clientSrc.value}
						{alt}
						class="rounded-lg w-full h-48 object-contain"
						draggable={false}
						loading="lazy"
					/>
				</figure>
			</CardHeader>
			<CardContent>
				<CardTitle class="mb-2 w-[80%] h-max text-base truncate">
					{name}
				</CardTitle>
				<p
					aria-label={`This product costs $ ${price}`}
					class="font-bold text-primary text-sm"
				>
					${price}
				</p>
			</CardContent>
		</Card>
	</Link>
	<Button
		size="icon"
		class="right-6 bottom-6 absolute size-8"
		aria-label="Add product to cart"
		onclick={() => addProductToCart()}
	>
		<span
			aria-hidden="true"
			class="relative flex justify-center items-center size-full"
		>
			<ShoppingCartIcon
				class="mt-1 mr-1.5 scale-100"
				aria-hidden
			/>
			<PlusIcon
				class="top-px right-0.5 absolute scale-75"
				aria-hidden
			/>
		</span>
	</Button>
</div>
