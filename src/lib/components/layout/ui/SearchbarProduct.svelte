<script lang="ts">
	import { Link } from '$lib/components/ui/link';
	import type { Product } from '$lib/types';

	type Props = Omit<
		Product,
		'description' | 'category' | 'createdAt' | 'updatedAt'
	>;

	let { quantity, price, name, id, imageUrl, imageDescription }: Props =
		$props();
</script>

<Link
	href={`/products/${id}`}
	aria-label={`Go to the product ${name} page`}
	class="flex flex-1 items-center gap-2"
>
	<figure>
		<img
			class="h-auto w-12 rounded"
			src={imageUrl}
			alt={imageDescription}
			loading="lazy"
		/>
	</figure>
	<section class="flex flex-1 flex-col gap-0.5">
		<h3 class="truncate font-semibold">{name}</h3>
		<span class="flex items-center justify-between gap-2 text-xs">
			${price}
			<span>{quantity} in stock</span>
		</span>
	</section>
</Link>
