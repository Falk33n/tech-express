<script lang="ts">
	import { AddProductForm } from '$lib/components/dashboard/products';
	import { Link } from '$lib/components/ui/link';
	import { SectionHeading } from '$lib/components/ui/typography';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Add Products - TechExpress</title>
</svelte:head>

<section class="container pt-20 pb-11">
	<SectionHeading class="mb-8">Products</SectionHeading>
	<AddProductForm form={data.addProductForm} />
	<p class="mt-11 text-center text-sm">
		Want to add accounts instead?
		<Link
			href="/dashboard/add/accounts"
			class="text-primary hover:underline hover:underline-offset-2"
		>
			Go to the accounts page
		</Link>.
	</p>
</section>
