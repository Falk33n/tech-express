<script lang="ts">
	import { MarkdownCard } from '$lib/components/markdown';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>About us - TechExpress</title>
</svelte:head>

<MarkdownCard
	data={data.about}
	title="About TechExpress"
	subTitle="Your trustworthy partner in tech since 2017"
/>
