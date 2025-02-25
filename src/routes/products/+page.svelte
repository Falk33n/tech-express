<script lang="ts">
	import { AlsoLookedAtProducts, CategoryPage } from '$lib/components/products';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const alsoLookedAtProducts = data.products.slice(0, 3);
	const capitalizedCategory = `${data.category?.charAt(0).toUpperCase()}${data.category?.slice(1)}`;
	const productsByCategory = data.products.filter(
		(product) => product.category === data.category,
	);
	const isProductsEmpty = productsByCategory.length < 3;
</script>

<svelte:head>
	<title>Categories - TechExpress</title>
</svelte:head>

<CategoryPage
	{capitalizedCategory}
	{productsByCategory}
	{isProductsEmpty}
/>
<AlsoLookedAtProducts {alsoLookedAtProducts} />
