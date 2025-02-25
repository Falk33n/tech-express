<script lang="ts">
	import { DashboardAccountsTable } from '$lib/components/dashboard/accounts';
	import { Link } from '$lib/components/ui/link';
	import { SectionHeading } from '$lib/components/ui/typography';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Edit Accounts - TechExpress</title>
</svelte:head>

<section class="container pt-20 pb-11">
	<SectionHeading class="mb-8">Accounts</SectionHeading>
	<DashboardAccountsTable
		accounts={data.accounts}
		form={data.editAccountForm}
	/>
	<p class="mt-11 text-center text-sm">
		Want to view products instead?
		<Link
			href="/dashboard/edit/products"
			class="text-primary hover:underline hover:underline-offset-2"
		>
			Go to the products page
		</Link>.
	</p>
</section>
