<script lang="ts">
	import { page } from '$app/state';
	import { SectionHeading } from '$lib/components/ui/typography';
</script>

<section
	class="flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center"
>
	<SectionHeading class="text-destructive mb-6 text-6xl font-black"
		>Error: {page.status}</SectionHeading
	>
	{#if page.error}
		<p class="font-sembold text-center text-xl">{page.error.message}</p>
	{/if}
</section>
