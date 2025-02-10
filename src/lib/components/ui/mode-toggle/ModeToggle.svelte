<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import {
		DropdownMenu,
		DropdownMenuCheckboxItem,
		DropdownMenuContent,
		DropdownMenuGroup,
		DropdownMenuGroupHeading,
		DropdownMenuItem,
		DropdownMenuSeparator,
		DropdownMenuTrigger,
	} from '$lib/components/ui/dropdown-menu';
	import { MoonIcon, SunIcon } from '$lib/components/ui/icons';
	import { mode, resetMode, setMode } from 'mode-watcher';
</script>

<DropdownMenu>
	<DropdownMenuTrigger
		class={buttonVariants({
			variant: 'outline',
			size: 'icon',
			className: 'cursor-pointer px-2',
		})}
		aria-label="Change color theme"
	>
		<SunIcon
			aria-hidden
			class="rotate-0 transition-all dark:scale-0 dark:-rotate-90"
		/>
		<MoonIcon
			aria-hidden
			class="absolute scale-0 rotate-90 transition-all dark:scale-110 dark:rotate-0"
		/>
	</DropdownMenuTrigger>
	<DropdownMenuContent
		align="center"
		sideOffset={14}
	>
		<DropdownMenuGroup>
			<DropdownMenuGroupHeading class="text-center">
				Color Theme
			</DropdownMenuGroupHeading>
			<DropdownMenuSeparator />
			<DropdownMenuCheckboxItem
				checked={$mode === 'light'}
				onclick={() => setMode('light')}
				class="cursor-pointer"
			>
				Light
			</DropdownMenuCheckboxItem>
			<DropdownMenuCheckboxItem
				checked={$mode === 'dark'}
				onclick={() => setMode('dark')}
				class="cursor-pointer"
			>
				Dark
			</DropdownMenuCheckboxItem>
			<DropdownMenuSeparator />
			<DropdownMenuItem
				class="cursor-pointer pl-8"
				onclick={() => resetMode()}>System</DropdownMenuItem
			>
		</DropdownMenuGroup>
	</DropdownMenuContent>
</DropdownMenu>
