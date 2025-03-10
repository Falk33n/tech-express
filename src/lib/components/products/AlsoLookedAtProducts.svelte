<script lang="ts">
	import { SectionAlert } from '$lib/components/errors';
	import { ProductsCard } from '$lib/components/home/ui';
	import { SectionHeading } from '$lib/components/ui/typography';
	import type { GlobalLayoutProps } from '$lib/types';
	import { cn } from '$lib/utils';
	import { getContext } from 'svelte';

	let { products }: GlobalLayoutProps = getContext('global-layout');

	const alsoLookedAtProducts = products.slice(0, 3);
	const isProductsEmpty = alsoLookedAtProducts.length < 3;
</script>

<section class="py-20 border-y w-full">
	<SectionHeading>Others looked at</SectionHeading>
	<div class={cn('container grid gap-6', !isProductsEmpty && 'md:grid-cols-3')}>
		{#if !isProductsEmpty}
			{#each alsoLookedAtProducts as { id, imageUrl, quantity, imageDescription, name, price }}
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
				We could sadly not retrieve products that others have looked at. Please
				try again in a couple of minutes.
			</SectionAlert>
		{/if}
	</div>
</section>
