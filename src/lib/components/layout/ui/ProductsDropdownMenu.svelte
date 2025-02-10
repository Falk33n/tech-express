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
	import {
		HeadphonesIcon,
		LaptopIcon,
		MonitorIcon,
		SmartphoneIcon,
	} from '$lib/components/ui/icons';
	import { Link } from '$lib/components/ui/link';

	const categories = [
		{ name: 'Phones', icon: SmartphoneIcon },
		{ name: 'Computers', icon: LaptopIcon },
		{ name: 'Monitors', icon: MonitorIcon },
		{ name: 'Accessories', icon: HeadphonesIcon },
	];
</script>

<DropdownMenu>
	<DropdownMenuTrigger
		class="focus-visible:ring-ring text-foreground/75 dark:text-muted-foreground hover:text-primary cursor-pointer rounded-md text-sm font-medium transition-colors focus-visible:ring-1 focus-visible:outline-hidden [&_svg]:pointer-events-none [&_svg]:size-4"
	>
		Products
	</DropdownMenuTrigger>
	<DropdownMenuContent
		align="center"
		sideOffset={22}
	>
		<DropdownMenuGroup class="space-y-2">
			<DropdownMenuGroupHeading class="my-0">
				Categories
			</DropdownMenuGroupHeading>
			<DropdownMenuSeparator />
			{#each categories as { icon: Icon, name }}
				<DropdownMenuItem
					class="flex cursor-pointer items-center justify-between gap-2"
				>
					{#snippet child({ props })}
						<Link
							href={`/products?category=${name.toLowerCase()}`}
							aria-label={`Go to the ${name} page`}
							{...props}
						>
							{name}
							<Icon
								class="text-primary"
								aria-hidden
							/>
						</Link>
					{/snippet}
				</DropdownMenuItem>
			{/each}
		</DropdownMenuGroup>
	</DropdownMenuContent>
</DropdownMenu>
