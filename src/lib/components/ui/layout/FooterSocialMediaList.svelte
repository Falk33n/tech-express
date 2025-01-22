<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import { Link } from '$lib/components/ui/link';
	import { cn } from '$lib/utils';
	import { FacebookIcon, InstagramIcon, XIcon } from 'lucide-svelte';

	type LinkProps = {
		href: string;
		icon: typeof FacebookIcon | typeof InstagramIcon | typeof XIcon;
		link: 'Facebook' | 'Instagram' | 'X';
	};

	const links: LinkProps[] = [
		{
			href: 'https://www.facebook.com/teknik-expressen/',
			icon: FacebookIcon,
			link: 'Facebook',
		},
		{
			href: 'https://www.instagram.com/teknik-expressen/',
			icon: InstagramIcon,
			link: 'Instagram',
		},
		{
			href: 'https://www.x.com/teknik-expressen/',
			icon: XIcon,
			link: 'X',
		},
	];
</script>

<section class="sm:mx-[20%] md:mx-[30%] lg:mx-0">
	<h3
		class="mb-4 text-lg font-semibold sm:whitespace-nowrap lg:whitespace-normal"
	>
		Följ oss
	</h3>
	<div class="flex gap-4">
		{#each links as { href, link, icon: Icon }}
			<Link
				class={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
				target="_blank"
				aria-label={`Gå till Teknik Expressens ${link} sida, öppnas i en ny flik`}
				{href}
			>
				<Icon
					aria-hidden
					class="size-4"
				/>
			</Link>
		{/each}
	</div>
</section>
