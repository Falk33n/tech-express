<script lang="ts">
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuGroup,
		DropdownMenuGroupHeading,
		DropdownMenuItem,
		DropdownMenuSeparator,
		DropdownMenuTrigger,
	} from '$lib/components/ui/dropdown-menu';
	import { Link } from '$lib/components/ui/link';

	const pages = [
		{ name: 'Edit Products', url: '/dashboard/edit/products' },
		{ name: 'Add Products', url: '/dashboard/add/products' },
		{ name: 'Edit Accounts', url: '/dashboard/edit/accounts' },
		{ name: 'Add Accounts', url: '/dashboard/add/accounts' },
	];
</script>

<DropdownMenu>
	<DropdownMenuTrigger
		class="focus-visible:ring-ring text-primary cursor-pointer rounded-md text-sm font-medium transition-colors hover:underline hover:underline-offset-2 focus-visible:ring-1 focus-visible:outline-hidden [&_svg]:pointer-events-none [&_svg]:size-4"
	>
		Admin
	</DropdownMenuTrigger>
	<DropdownMenuContent
		align="center"
		sideOffset={22}
	>
		<DropdownMenuGroup class="space-y-2">
			<DropdownMenuGroupHeading class="my-0">
				Dashboard
			</DropdownMenuGroupHeading>
			<DropdownMenuSeparator />
			{#each pages as { name, url }}
				<DropdownMenuItem
					class="flex cursor-pointer items-center justify-between gap-2"
				>
					{#snippet child({ props })}
						<Link
							href={url}
							aria-label={`Go to the ${name} page`}
							{...props}
						>
							{name}
						</Link>
					{/snippet}
				</DropdownMenuItem>
			{/each}
		</DropdownMenuGroup>
	</DropdownMenuContent>
</DropdownMenu>
