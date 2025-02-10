<script lang="ts">
	import { SectionAlert } from '$lib/components/errors';
	import { ProductsCard } from '$lib/components/home/ui';
	import { SectionHeading } from '$lib/components/ui/typography';
	import type { Product } from '$lib/types';
	import { cn } from '$lib/utils';

	type Props = {
		randomFourProducts: Product[];
	};

	let { randomFourProducts }: Props = $props();

	const isProductsEmpty = randomFourProducts.length < 4;
</script>

<section
	id="popular-products"
	class="w-full scroll-mt-16 border-y py-20"
>
	<SectionHeading>Popular Products</SectionHeading>
	<div
		class={cn(
			'container grid gap-6',
			!isProductsEmpty && 'sm:grid-cols-2 lg:grid-cols-4',
		)}
	>
		{#if !isProductsEmpty}
			{#each randomFourProducts as { id, imageUrl, quantity, imageDescription, name, price }}
				<ProductsCard
					src={imageUrl}
					alt={imageDescription}
					href={`/products/${id}`}
					{price}
					{name}
					{id}
					{quantity}
				/>
			{/each}
		{:else}
			<SectionAlert>
				We could sadly not retrieve the most popular products. Please try again
				in a couple of minutes.
			</SectionAlert>
		{/if}
	</div>
</section>
