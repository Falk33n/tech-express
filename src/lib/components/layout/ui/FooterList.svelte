<script lang="ts">
	import { FooterHeadingList } from '$lib/components/layout/ui';
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

<section class="sm:mx-[10%] md:mx-[15%] lg:mx-0">
	<FooterHeadingList>{@html header}</FooterHeadingList>
	<ul class="space-y-2">
		{#each links as { link, href }}
			<li>
				<Link
					{href}
					aria-label={`Gå to the page ${link}`}
					class="text-muted-foreground hover:text-primary"
				>
					{@html link}
				</Link>
			</li>
		{/each}
	</ul>
</section>
