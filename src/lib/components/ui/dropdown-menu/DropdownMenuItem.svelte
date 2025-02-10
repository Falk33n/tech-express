<script lang="ts">
	import { cn } from '$lib/utils';
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';

	type Props = DropdownMenuPrimitive.ItemProps & {
		inset?: boolean;
	};

	let {
		ref = $bindable(null),
		class: className,
		inset,
		...props
	}: Props = $props();
</script>

<DropdownMenuPrimitive.Item
	bind:ref
	class={cn(
		'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0',
		inset && 'pl-8',
		className,
	)}
	{...props}
/>
