<script lang="ts">
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle,
	} from '$lib/components/ui/card';

	type Props = { src: string; alt: string; name: string; price: string };

	let { src, alt, name, price }: Props = $props();
</script>

<Card>
	<CardHeader>
		<figure>
			<img
				{src}
				{alt}
				class="h-48 w-full rounded-t-lg object-cover"
			/>
		</figure>
	</CardHeader>
	<CardContent>
		<CardTitle class="mb-2 text-lg">{name}</CardTitle>
		<p class="font-bold text-primary">{price}</p>
	</CardContent>
</Card>
