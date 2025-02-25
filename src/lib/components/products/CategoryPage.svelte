<script lang="ts">
	import { SectionAlert } from '$lib/components/errors';
	import { ProductsCard } from '$lib/components/home/ui';
	import { SectionHeading } from '$lib/components/ui/typography';
	import type { Product } from '$lib/types';
	import { cn } from '$lib/utils';

	type Props = {
		capitalizedCategory: string | null;
		productsByCategory: Product[];
		isProductsEmpty: boolean;
	};

	let { capitalizedCategory, productsByCategory, isProductsEmpty }: Props =
		$props();
</script>

<section class="w-full border-y py-20">
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
