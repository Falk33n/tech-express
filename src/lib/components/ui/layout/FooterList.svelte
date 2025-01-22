<script lang="ts">
	import { Link } from '$lib/components/ui/link';

	type Props = {
		header: string;
		links: {
			link: string;
			href: string;
		}[];
	};

	let { header, links }: Props = $props();
</script>

<section class="sm:mx-[20%] md:mx-[30%] lg:mx-0">
	<h3
		class="mb-4 text-lg font-semibold sm:whitespace-nowrap lg:whitespace-normal"
	>
		{@html header}
	</h3>
	<ul class="space-y-2">
		{#each links as { link, href }}
			<li>
				<Link
					{href}
					aria-label={`Gå till sidan ${link}`}
					class="text-muted-foreground hover:text-primary"
				>
					{@html link}
				</Link>
			</li>
		{/each}
	</ul>
</section>
