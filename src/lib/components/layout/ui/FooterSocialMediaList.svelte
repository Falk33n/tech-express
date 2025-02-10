<script lang="ts">
	import { FooterHeadingList } from '$lib/components/layout/ui';
	import { buttonVariants } from '$lib/components/ui/button';
	import {
		FacebookIcon,
		InstagramIcon,
		YouTubeIcon,
	} from '$lib/components/ui/icons';
	import { Link } from '$lib/components/ui/link';
	import { cn } from '$lib/utils';

	type LinkProps = {
		href: string;
		icon: typeof FacebookIcon | typeof InstagramIcon | typeof YouTubeIcon;
		link: 'Facebook' | 'Instagram' | 'YouTube';
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
			href: 'https://www.youtube.com/teknik-expressen/',
			icon: YouTubeIcon,
			link: 'YouTube',
		},
	];
</script>

<section class="flex flex-col items-center sm:mx-[10%] md:mx-[15%] lg:mx-0">
	<FooterHeadingList>Follow us</FooterHeadingList>
	<div class="flex gap-4">
		{#each links as { href, link, icon: Icon }}
			<Link
				class={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}
				target="_blank"
				aria-label={`Go to TechExpress's ${link} page, opens in a new tab`}
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
