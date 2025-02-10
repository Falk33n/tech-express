<script lang="ts">
	import {
		Categories,
		Hero,
		LatestProducts,
		PopularProducts,
	} from '$lib/components/home';
	import type { LayoutProps } from './$types';

	let { data }: LayoutProps = $props();

	const isProductsEmpty = data.products.length < 3;
	const randomFourProducts = data.products
		.sort(() => 0.5 - Math.random())
		.slice(0, 4);
	const latestThreeProducts = !isProductsEmpty ? data.products.slice(0, 3) : [];
</script>

<Hero />
<PopularProducts {randomFourProducts} />
<Categories />
<LatestProducts {latestThreeProducts} />
