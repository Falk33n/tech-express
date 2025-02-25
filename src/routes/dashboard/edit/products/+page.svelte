<script lang="ts">
	import { DashboardProductsTable } from '$lib/components/dashboard/products';
	import { Link } from '$lib/components/ui/link';
	import { SectionHeading } from '$lib/components/ui/typography';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Edit Products - TechExpress</title>
</svelte:head>

<section class="container pt-20 pb-11">
	<SectionHeading class="mb-8">Products</SectionHeading>
	<DashboardProductsTable
		products={data.products}
		form={data.editProductForm}
	/>
	<p class="mt-11 text-center text-sm">
		Want to view accounts instead?
		<Link
			href="/dashboard/edit/accounts"
			class="text-primary hover:underline hover:underline-offset-2"
		>
			Go to the accounts page
		</Link>.
	</p>
</section>
