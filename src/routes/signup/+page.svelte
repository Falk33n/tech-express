<script lang="ts">
	import { SignUp } from '$lib/components/account';
	import { setContext } from 'svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	setContext('signup-page', data.signupForm);
</script>

<svelte:head>
	<title>Signup - TechExpress</title>
</svelte:head>

<SignUp />
