<script lang="ts">
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Link } from '$lib/components/ui/link';
	import { SectionHeading } from '$lib/components/ui/typography';
	import {
		HeadphonesIcon,
		LaptopIcon,
		MonitorIcon,
		SmartphoneIcon,
	} from 'lucide-svelte';

	const categories = [
		{ name: 'Phones', icon: SmartphoneIcon },
		{ name: 'Computers', icon: LaptopIcon },
		{ name: 'Monitors', icon: MonitorIcon },
		{ name: 'Accessories', icon: HeadphonesIcon },
	];
</script>

<section
	id="categories"
	class="bg-muted muted-background w-full scroll-mt-16 py-20"
>
	<SectionHeading class="backdrop-blur-xs">Categories</SectionHeading>
	<div class="container grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
		{#each categories as { name, icon: Icon }}
			<Link
				href={`/products?category=${name.toLowerCase()}`}
				aria-label={`Go to the ${name} page`}
				class="transition-transform hover:scale-105 focus-visible:scale-105 [&_svg]:size-10"
			>
				<Card>
					<CardContent class="flex flex-col items-center justify-center p-6">
						<Icon
							aria-hidden
							class="text-primary mb-4 scale-110"
						/>
						<h3 class="font-semibold">{name}</h3>
					</CardContent>
				</Card>
			</Link>
		{/each}
	</div>
</section>
