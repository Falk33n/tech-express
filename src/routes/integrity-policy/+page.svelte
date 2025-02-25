<script lang="ts">
	import { PUBLIC_INTEGRITY_POLICY_LAST_UPDATED } from '$env/static/public';
	import { MarkdownCard } from '$lib/components/markdown';
	import { ShieldIcon } from 'lucide-svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Integrity Policy - TechExpress</title>
</svelte:head>

<MarkdownCard
	data={data.integrityPolicy}
	title="Integrity Policy"
	subTitle={`Last updated: ${PUBLIC_INTEGRITY_POLICY_LAST_UPDATED}`}
	icon={ShieldIcon}
/>
