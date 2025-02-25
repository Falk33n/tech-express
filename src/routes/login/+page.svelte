<script lang="ts">
	import { Login } from '$lib/components/account';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Login - TechExpress</title>
</svelte:head>

<Login form={data.loginForm} />
