<script lang="ts">
	import {
		ProductsDropdownMenu,
		Searchbar,
		ShoppingCartDropdownMenu,
	} from '$lib/components/layout/ui';
	import { Button } from '$lib/components/ui/button';
	import { MenuIcon } from '$lib/components/ui/icons';
	import { Link } from '$lib/components/ui/link';
	import { ModeToggle } from '$lib/components/ui/mode-toggle';
	import { Sheet, SheetContent, SheetTrigger } from '$lib/components/ui/sheet';
	import type { Product } from '$lib/types';
	import { onMount } from 'svelte';

	let isMobile = $state(false);

	type Props = { products: Product[] };

	let { products }: Props = $props();

	const links = [
		{ text: 'Account', href: '/account' },
		{ text: 'About', href: '/about' },
		{ text: 'Contact', href: '/contact' },
	];

	function updateMobileMenuState() {
		const mediaQuery = window.matchMedia('(max-width: 1024px)');
		isMobile = mediaQuery.matches;
	}

	onMount(() => {
		updateMobileMenuState();
		window.addEventListener('resize', updateMobileMenuState);

		return () => {
			window.removeEventListener('resize', updateMobileMenuState);
		};
	});
</script>

<header class="bg-background sticky top-0 z-50 w-full border-b">
	<nav class="container flex h-16 items-center">
		<div class="flex items-center gap-6">
			<Link
				href="/"
				class="hover:text-primary text-xl font-bold tracking-wide transition-colors"
			>
				TechExpress
			</Link>

			{#if !isMobile}
				<div class="flex items-center gap-6">
					<ProductsDropdownMenu />
					{#each links as { href, text }}
						<Link
							{href}
							class="text-foreground/75 dark:text-muted-foreground hover:text-primary text-sm font-medium"
						>
							{text}
						</Link>
					{/each}
				</div>
			{/if}
		</div>

		<div class="flex flex-1 items-center justify-end gap-4">
			{#if !isMobile}
				<div class="flex w-full max-w-sm items-center gap-4">
					<ModeToggle />
					<Searchbar {products} />
					<ShoppingCartDropdownMenu />
				</div>
			{/if}

			{#if isMobile}
				<Sheet>
					<SheetTrigger>
						{#snippet child({ props })}
							<Button
								variant="ghost"
								size="icon"
								{...props}
							>
								<MenuIcon aria-hidden />
							</Button>
						{/snippet}
					</SheetTrigger>
					<SheetContent>
						<div class="flex flex-col gap-6 py-6">
							{#each links as link}
								<Link
									href={link.href}
									class="text-foreground/75 dark:text-muted-foreground hover:text-primary text-sm font-medium"
								>
									{link.text}
								</Link>
							{/each}
						</div>
						<div class="flex w-full flex-col items-center gap-6 pb-6">
							<div class="flex items-center gap-6">
								<ModeToggle />
								<ShoppingCartDropdownMenu />
							</div>
							<Searchbar {products} />
						</div>
					</SheetContent>
				</Sheet>
			{/if}
		</div>
	</nav>
</header>
