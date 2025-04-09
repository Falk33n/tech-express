<script lang="ts">
	import {
		AdminDropdownMenu,
		ProductsDropdownMenu,
		Searchbar,
		ShoppingCartDropdownMenu,
	} from '$lib/components/layout/ui';
	import { Button } from '$lib/components/ui/button';
	import { Link } from '$lib/components/ui/link';
	import { ModeToggle } from '$lib/components/ui/mode-toggle';
	import { Sheet, SheetContent, SheetTrigger } from '$lib/components/ui/sheet';
	import type { GlobalLayoutProps } from '$lib/types';
	import { cn } from '$lib/utils';
	import { Dialog as SheetPrimitive } from 'bits-ui';
	import { MenuIcon } from 'lucide-svelte';
	import { getContext, onMount } from 'svelte';

	let isMobile = $state(false);

	let triggerCloseRef = $state<HTMLButtonElement | null>(null);

	let { isAdmin }: GlobalLayoutProps = getContext('global-layout');

	const links = [
		{ text: 'Account', href: '/account' },
		{ text: 'About', href: '/about' },
		{ text: 'Contact', href: '/contact' },
	];

	const adminLinks = [
		{ name: 'Edit Products', url: '/dashboard/edit/products' },
		{ name: 'Add Products', url: '/dashboard/add/products' },
		{ name: 'Edit Accounts', url: '/dashboard/edit/accounts' },
		{ name: 'Add Accounts', url: '/dashboard/add/accounts' },
	];

	function updateMobileMenuState() {
		const mediaQuery = window.matchMedia('(max-width: 1024px)');
		isMobile = mediaQuery.matches;
	}

	function closeSheet() {
		if (!triggerCloseRef) return;
		triggerCloseRef.click();
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
							class="text-foreground/75 hover:text-primary dark:text-muted-foreground text-sm font-medium"
						>
							{text}
						</Link>
					{/each}
					{#if isAdmin}
						<AdminDropdownMenu />
					{/if}
				</div>
			{/if}
		</div>

		<div class="flex flex-1 items-center justify-end gap-4">
			{#if !isMobile}
				<div class="flex w-full max-w-sm items-center gap-4">
					<ModeToggle />
					<Searchbar />
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
								aria-label="Open Menu"
								{...props}
							>
								<MenuIcon aria-hidden />
							</Button>
						{/snippet}
					</SheetTrigger>
					<SheetContent>
						<SheetPrimitive.Close bind:ref={triggerCloseRef} />
						<div class={cn('flex flex-col gap-6', isAdmin ? 'pt-6' : 'py-6')}>
							{#each links as link}
								<Link
									href={link.href}
									onclick={() => closeSheet()}
									class="text-foreground/75 hover:text-primary dark:text-muted-foreground text-sm font-medium"
								>
									{link.text}
								</Link>
							{/each}
						</div>
						{#if isAdmin}
							<div class="flex flex-col gap-6 py-6">
								<h3 class="font-semibold">Admin</h3>
								{#each adminLinks as adminLink}
									<Link
										href={adminLink.url}
										onclick={() => closeSheet()}
										class="text-primary text-sm font-medium hover:underline hover:underline-offset-2"
									>
										{adminLink.name}
									</Link>
								{/each}
							</div>
						{/if}
						<div class="flex w-full flex-col items-center gap-6 pb-6">
							<div class="flex items-center gap-6">
								<ModeToggle />
								<ShoppingCartDropdownMenu />
							</div>
							<Searchbar />
						</div>
					</SheetContent>
				</Sheet>
			{/if}
		</div>
	</nav>
</header>
