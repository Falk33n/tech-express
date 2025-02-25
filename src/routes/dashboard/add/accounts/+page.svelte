<script lang="ts">
	import { AddAccountForm } from '$lib/components/dashboard/accounts';
	import { Link } from '$lib/components/ui/link';
	import { SectionHeading } from '$lib/components/ui/typography';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Add Accounts - TechExpress</title>
</svelte:head>

<section class="container pt-20 pb-11">
	<SectionHeading class="mb-8">Accounts</SectionHeading>
	<AddAccountForm form={data.addAccountForm} />
	<p class="mt-11 text-center text-sm">
		Want to add products instead?
		<Link
			href="/dashboard/add/products"
			class="text-primary hover:underline hover:underline-offset-2"
		>
			Go to the products page
		</Link>.
	</p>
</section>
