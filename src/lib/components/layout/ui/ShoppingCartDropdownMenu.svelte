<script lang="ts">
	import { ShoppingCartProduct } from '$lib/components/layout/ui';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuGroup,
		DropdownMenuGroupHeading,
		DropdownMenuItem,
		DropdownMenuSeparator,
		DropdownMenuTrigger,
	} from '$lib/components/ui/dropdown-menu';
	import { ShoppingCartIcon } from '$lib/components/ui/icons';
	import { productsInShoppingCart } from '$lib/shopping-cart-state.svelte';

	const totalProductsInShoppingCart = $derived.by(() =>
		productsInShoppingCart.value.reduce(
			(sum, product) => sum + (product.totalInCart ?? 0),
			0,
		),
	);

	const totalPriceInShoppingCart = $derived.by(() =>
		productsInShoppingCart.value.reduce(
			(sum, product) => sum + (product.totalInCart ?? 0) * (product.price ?? 0),
			0,
		),
	);
</script>

<DropdownMenu>
	<DropdownMenuTrigger class="relative cursor-pointer px-2">
		{#snippet child({ props })}
			<Button
				variant="outline"
				size="icon"
				aria-label="Open the shopping cart"
				{...props}
			>
				{#if totalProductsInShoppingCart > 0}
					<Badge
						class="absolute top-0 right-0 z-[10] flex size-5 scale-75 items-center justify-center rounded-full p-0"
						aria-hidden
					>
						{totalProductsInShoppingCart}
					</Badge>
				{/if}
				<ShoppingCartIcon
					aria-hidden
					class="absolute bottom-2 left-1.5"
				/>
			</Button>
		{/snippet}
	</DropdownMenuTrigger>
	<DropdownMenuContent
		align="center"
		sideOffset={14}
	>
		<DropdownMenuGroup class="w-[250px] max-w-full space-y-2">
			<DropdownMenuGroupHeading class="my-0">
				Shopping Cart
			</DropdownMenuGroupHeading>
			<DropdownMenuSeparator />
			{#if productsInShoppingCart.value.length > 0}
				{#each productsInShoppingCart.value as product}
					<DropdownMenuItem
						onclick={(event) => event.preventDefault()}
						class="flex cursor-pointer items-center justify-between gap-2"
					>
						<ShoppingCartProduct {...product} />
					</DropdownMenuItem>
				{/each}
				<DropdownMenuItem
					class="flex cursor-pointer items-center justify-between gap-2"
				>
					<p>
						Total amount is <span class="font-semibold"
							>${totalPriceInShoppingCart}</span
						>.
					</p>
				</DropdownMenuItem>
				<DropdownMenuItem
					onclick={(event) => event.preventDefault()}
					class="flex cursor-pointer items-center justify-between gap-2"
				>
					<Button
						size="sm"
						class="w-full"
					>
						Proceed to checkout
					</Button>
				</DropdownMenuItem>
			{:else}
				<DropdownMenuItem
					class="flex cursor-pointer items-center justify-between gap-2"
				>
					<p>Shopping cart is empty.</p>
				</DropdownMenuItem>
			{/if}
		</DropdownMenuGroup>
	</DropdownMenuContent>
</DropdownMenu>
