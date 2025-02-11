<script lang="ts">
	import { SectionHeading } from '$lib/components/ui/typography';
	import type { Snippet } from 'svelte';

	type Props = { children: Snippet<[]> };

	let { children }: Props = $props();
</script>

<section class="container my-20">
	<SectionHeading class="mb-5 text-4xl">Contact Us</SectionHeading>
	<p class="mb-10 text-center">
		Get in touch with the support. We will help you!
	</p>
	{@render children()}
</section>
