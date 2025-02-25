<script lang="ts">
	import { SignUp } from '$lib/components/account';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Signup - TechExpress</title>
</svelte:head>

<SignUp form={data.signupForm} />
