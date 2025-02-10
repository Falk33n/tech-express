<script lang="ts">
	import { goto } from '$app/navigation';
	import { ShoppingCartCounterButtons } from '$lib/components/layout/ui';
	import { Link } from '$lib/components/ui/link';
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
</script>

<div class="relative flex-1">
	<Link
		href={`/products/${id}`}
		onclick={() => goto(`/products/${id}`)}
		aria-label={`Go to the product ${name} page`}
		class="flex flex-1 items-center gap-2"
	>
		<figure>
			<img
				class="h-auto w-12 rounded"
				src={imageUrl}
				alt={imageDescription}
				loading="lazy"
			/>
		</figure>
		<div class="flex flex-1 flex-col gap-2">
			<div class="flex items-center justify-between gap-2">
				<h3 class="truncate font-semibold">{name}</h3>
				<span>${totalInCart && price * totalInCart}</span>
			</div>
			<span class="flex items-center justify-end gap-2">
				{quantity} in stock
			</span>
		</div>
	</Link>
	<div class="absolute bottom-0 left-14 flex items-center justify-center gap-2">
		<ShoppingCartCounterButtons
			{id}
			{imageDescription}
			{imageUrl}
			{name}
			{price}
			{quantity}
			{totalInCart}
		/>
	</div>
</div>
