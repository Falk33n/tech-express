<script lang="ts">
	import { Account } from '$lib/components/account';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Account - TechExpress</title>
</svelte:head>

<Account
	deleteForm={data.deleteForm}
	updateForm={data.updateForm}
/>
