<script lang="ts">
	import { Account } from '$lib/components/account';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Account - TechExpress</title>
</svelte:head>

<Account
	deleteForm={data.deleteForm}
	updateForm={data.updateForm}
/>
