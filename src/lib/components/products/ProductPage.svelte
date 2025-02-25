<script lang="ts">
	import { SectionAlert } from '$lib/components/errors';
	import { ProductInformation } from '$lib/components/products';
	import type { Product } from '$lib/types';

	type Props = {
		product: Product;
		isProductNull: boolean;
	};

	let { product, isProductNull }: Props = $props();
</script>

<section class="w-full border-y py-20">
	<div class="container mb-7">
		{#if !isProductNull}
			<ProductInformation
				description={product.description}
				src={product.imageUrl}
				alt={product.imageDescription}
				price={product.price}
				name={product.name}
				id={product.id}
				quantity={product.quantity}
			/>
		{:else}
			<SectionAlert>
				We could sadly not retrieve the product. Please try again in a couple of
				minutes.
			</SectionAlert>
		{/if}
	</div>
</section>
