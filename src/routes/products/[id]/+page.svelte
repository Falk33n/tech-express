<script lang="ts">
	import { page } from '$app/state';
	import { AlsoLookedAtProducts, ProductPage } from '$lib/components/products';
	import { setContext } from 'svelte';

	setContext('products-single-page', page.params.id);
</script>

<svelte:head>
	<title>Product - TechExpress</title>
</svelte:head>

<ProductPage />
<AlsoLookedAtProducts />
