<script lang="ts">
	import { SectionAlert } from '$lib/components/errors';
	import { ProductsCard } from '$lib/components/home/ui';
	import { SectionHeading } from '$lib/components/ui/typography';
	import type { GlobalLayoutProps } from '$lib/types';
	import { cn } from '$lib/utils';
	import { getContext } from 'svelte';

	let { products }: GlobalLayoutProps = getContext('global-layout');

	const latestThreeProducts = products.slice(0, 3);
	const isProductsEmpty = latestThreeProducts.length < 3;
</script>

<section class="w-full overflow-hidden border-y py-20">
	<SectionHeading>Latest Products</SectionHeading>
	<div class={cn('container grid gap-6', !isProductsEmpty && 'md:grid-cols-3')}>
		{#if !isProductsEmpty}
			{#each latestThreeProducts as { id, imageUrl, quantity, category, imageDescription, name, price } (imageUrl)}
				<ProductsCard
					src={imageUrl}
					alt={imageDescription}
					href={`/products/${id}`}
					{category}
					{price}
					{name}
					{id}
					{quantity}
				/>
			{/each}
		{:else}
			<SectionAlert>
				We could sadly not retrieve the latest products. Please try again in a
				couple of minutes.
			</SectionAlert>
		{/if}
	</div>
</section>
