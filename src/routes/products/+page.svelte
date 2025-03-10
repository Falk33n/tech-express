<script lang="ts">
	import { page } from '$app/state';
	import { AlsoLookedAtProducts, CategoryPage } from '$lib/components/products';
	import { setContext } from 'svelte';

	setContext('products-category-page', page.url.searchParams.get('category'));
</script>

<svelte:head>
	<title>Categories - TechExpress</title>
</svelte:head>

<CategoryPage />
<AlsoLookedAtProducts />
