<script lang="ts">
	import { cn } from '$lib/utils';
	import {
		DropdownMenu as DropdownMenuPrimitive,
		type WithoutChild,
	} from 'bits-ui';
	import { ChevronRightIcon } from 'lucide-svelte';

	type Props = WithoutChild<DropdownMenuPrimitive.SubTriggerProps> & {
		inset?: boolean;
	};

	let {
		ref = $bindable(null),
		class: className,
		inset,
		children,
		...props
	}: Props = $props();
</script>

<DropdownMenuPrimitive.SubTrigger
	bind:ref
	class={cn(
		'data-[highlighted]:bg-accent data-[state=open]:bg-accent flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
		inset && 'pl-8',
		className,
	)}
	{...props}
>
	{@render children?.()}
	<ChevronRightIcon
		aria-hidden
		class="ml-auto"
	/>
</DropdownMenuPrimitive.SubTrigger>
