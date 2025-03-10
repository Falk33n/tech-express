<script lang="ts">
	import { Login } from '$lib/components/account';
	import { setContext } from 'svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	setContext('login-page', data.loginForm);
</script>

<svelte:head>
	<title>Login - TechExpress</title>
</svelte:head>

<Login />
