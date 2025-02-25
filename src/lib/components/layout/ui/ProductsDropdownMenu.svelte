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
	import {
		HeadphonesIcon,
		LaptopIcon,
		MonitorIcon,
		SmartphoneIcon,
	} from 'lucide-svelte';

	const categories = [
		{ name: 'Phones', icon: SmartphoneIcon },
		{ name: 'Computers', icon: LaptopIcon },
		{ name: 'Monitors', icon: MonitorIcon },
		{ name: 'Accessories', icon: HeadphonesIcon },
	];
</script>

<DropdownMenu>
	<DropdownMenuTrigger
		class="focus-visible:ring-ring text-foreground/75 hover:text-primary dark:text-muted-foreground cursor-pointer rounded-md text-sm font-medium transition-colors focus-visible:ring-1 focus-visible:outline-hidden [&_svg]:pointer-events-none [&_svg]:size-4"
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
