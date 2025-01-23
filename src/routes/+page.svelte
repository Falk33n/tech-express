<script lang="ts">
	import {
		Categories,
		Hero,
		LatestProducts,
		Newsletter,
		PopularProducts,
	} from '$lib/components/home';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const isProductsEmpty = data.products.length < 3;
	const latestThreeProducts = !isProductsEmpty ? data.products.slice(0, 3) : [];
</script>

<Hero />
<PopularProducts />
<Categories />
<LatestProducts {latestThreeProducts} />
<Newsletter />
