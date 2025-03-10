<script lang="ts">
	import { SectionAlert } from '$lib/components/errors';
	import { ProductsCard } from '$lib/components/home/ui';
	import { SectionHeading } from '$lib/components/ui/typography';
	import type {
		GlobalLayoutProps,
		ProductsCategoryPageProps,
	} from '$lib/types';
	import { cn } from '$lib/utils';
	import { getContext } from 'svelte';

	let { products }: GlobalLayoutProps = getContext('global-layout');
	let category: ProductsCategoryPageProps = getContext(
		'products-category-page',
	);

	const capitalizedCategory = `${category?.charAt(0).toUpperCase()}${category?.slice(1)}`;
	const productsByCategory = products.filter(
		(product) => product.category === category,
	);
	const isProductsEmpty = productsByCategory.length < 3;
</script>

<section class="py-20 border-y w-full">
	<SectionHeading>{capitalizedCategory}</SectionHeading>
	<div
		class={cn(
			'container mb-7 grid gap-6',
			!isProductsEmpty && 'md:grid-cols-3',
		)}
	>
		{#if !isProductsEmpty}
			{#each productsByCategory as { id, imageUrl, quantity, imageDescription, name, price }}
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
				We could sadly not retrieve the latest products. Please try again in a
				couple of minutes.
			</SectionAlert>
		{/if}
	</div>
</section>
