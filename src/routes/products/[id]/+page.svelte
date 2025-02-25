<script lang="ts">
	import { AlsoLookedAtProducts, ProductPage } from '$lib/components/products';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const product = data.products.filter(
		(product) => product.id === data.productId,
	)[0];

	const alsoLookedAtProducts = data.products.slice(0, 3);

	const isProductNull = product === undefined;
</script>

<svelte:head>
	<title>Product - TechExpress</title>
</svelte:head>

<ProductPage
	{product}
	{isProductNull}
/>
<AlsoLookedAtProducts {alsoLookedAtProducts} />
