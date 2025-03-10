<script lang="ts">
	import { CheckoutForm, ShoppingCartProduct } from '$lib/components/layout/ui';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogHeader,
		DialogTitle,
		DialogTrigger,
	} from '$lib/components/ui/dialog';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuGroup,
		DropdownMenuGroupHeading,
		DropdownMenuItem,
		DropdownMenuSeparator,
		DropdownMenuTrigger,
	} from '$lib/components/ui/dropdown-menu';
	import { productsInShoppingCart } from '$lib/shopping-cart-state.svelte';
	import { ShoppingCartIcon } from 'lucide-svelte';

	const totalProductsInShoppingCart = $derived.by(() =>
		productsInShoppingCart.value.reduce(
			(sum, product) => sum + (product.totalInCart ?? 0),
			0,
		),
	);

	const totalPriceInShoppingCart = $derived.by(() =>
		productsInShoppingCart.value
			.reduce(
				(sum, product) =>
					sum + (product.totalInCart ?? 0) * (product.price ?? 0),
				0,
			)
			.toFixed(2),
	);
</script>

<DropdownMenu>
	<DropdownMenuTrigger class="relative px-2 cursor-pointer">
		{#snippet child({ props })}
			<Button
				variant="outline"
				size="icon"
				aria-label="Open the shopping cart"
				{...props}
			>
				{#if totalProductsInShoppingCart > 0}
					<Badge
						class="top-0 right-0 z-[10] absolute flex justify-center items-center p-0 rounded-full size-5 scale-75"
						aria-hidden
					>
						{totalProductsInShoppingCart}
					</Badge>
				{/if}
				<ShoppingCartIcon
					aria-hidden
					class="bottom-2 left-1.5 absolute"
				/>
			</Button>
		{/snippet}
	</DropdownMenuTrigger>
	<DropdownMenuContent
		align="center"
		sideOffset={14}
	>
		<DropdownMenuGroup class="space-y-2 w-[280px] max-w-full">
			<DropdownMenuGroupHeading class="my-0">
				Shopping Cart
			</DropdownMenuGroupHeading>
			<DropdownMenuSeparator />
			{#if productsInShoppingCart.value.length > 0}
				{#each productsInShoppingCart.value as product}
					<DropdownMenuItem
						onclick={(event) => event.preventDefault()}
						class="flex justify-between items-center gap-2 cursor-pointer"
					>
						<ShoppingCartProduct {...product} />
					</DropdownMenuItem>
				{/each}
				<DropdownMenuItem
					class="flex justify-between items-center gap-2 cursor-pointer"
				>
					<p>
						Total amount is
						<span class="font-semibold">
							${totalPriceInShoppingCart}
						</span>
					</p>
				</DropdownMenuItem>
				<DropdownMenuItem
					onclick={(event) => event.preventDefault()}
					class="flex justify-between items-center gap-2 cursor-pointer"
				>
					<Dialog>
						<DialogTrigger>
							{#snippet child({ props })}
								<Button
									size="sm"
									class="w-full"
									{...props}
								>
									Proceed to checkout
								</Button>
							{/snippet}
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle class="text-2xl">Checkout</DialogTitle>
								<DialogDescription>
									Here you can checkout your shopping cart by entering your card
									details.
								</DialogDescription>
							</DialogHeader>
							<CheckoutForm />
						</DialogContent>
					</Dialog>
				</DropdownMenuItem>
			{:else}
				<DropdownMenuItem
					class="flex justify-between items-center gap-2 cursor-pointer"
				>
					<p>Shopping cart is empty.</p>
				</DropdownMenuItem>
			{/if}
		</DropdownMenuGroup>
	</DropdownMenuContent>
</DropdownMenu>
