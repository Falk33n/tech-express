<script lang="ts">
	import { ProductsCard } from '$lib/components/home/ui';
	import {
		Alert,
		AlertDescription,
		AlertTitle,
	} from '$lib/components/ui/alert';
	import type { Product } from '$lib/types';
	import { cn } from '$lib/utils';

	type Props = {
		latestThreeProducts: Product[];
	};

	let { latestThreeProducts }: Props = $props();

	const isProductsEmpty = latestThreeProducts.length < 3;
</script>

<section class="w-full py-20">
	<h2 class="mb-12 text-center text-3xl font-bold tracking-tighter">
		Senaste Produkterna
	</h2>
	<div class={cn('container grid gap-6', !isProductsEmpty && 'md:grid-cols-3')}>
		{#if !isProductsEmpty}
			{#each latestThreeProducts as { imageUrls, imageDescription, name, price }}
				<ProductsCard
					src={imageUrls[0]}
					alt={imageDescription}
					price={price.toString()}
					{name}
				/>
			{/each}
		{:else}
			<Alert
				variant="destructive"
				class="mx-auto w-[calc(100%-2rem)] sm:w-[70%] sm:max-w-[40rem]"
			>
				<AlertTitle>Något gick fel!</AlertTitle>
				<AlertDescription>
					Vi kunde inte hämta dem senaste produkterna. Vänligen försök igen om
					några minuter.
				</AlertDescription>
			</Alert>
		{/if}
	</div>
</section>

<!-- 				class="absolute left-1/2 top-0  -translate-x-1/2 "
 -->
