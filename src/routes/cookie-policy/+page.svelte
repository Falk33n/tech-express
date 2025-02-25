<script lang="ts">
	import { PUBLIC_COOKIE_POLICY_LAST_UPDATED } from '$env/static/public';
	import { MarkdownCard } from '$lib/components/markdown';
	import { CookieIcon } from 'lucide-svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Cookie Policy - TechExpress</title>
</svelte:head>

<MarkdownCard
	data={data.cookiePolicy}
	title="Cookie Policy"
	subTitle={`Last updated: ${PUBLIC_COOKIE_POLICY_LAST_UPDATED}`}
	icon={CookieIcon}
/>
