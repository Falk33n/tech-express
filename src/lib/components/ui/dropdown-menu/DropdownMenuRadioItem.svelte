<script lang="ts">
	import { cn } from '$lib/utils';
	import {
		DropdownMenu as DropdownMenuPrimitive,
		type WithoutChild,
	} from 'bits-ui';
	import { CircleIcon } from 'lucide-svelte';

	type Props = WithoutChild<DropdownMenuPrimitive.RadioItemProps>;

	let {
		ref = $bindable(null),
		class: className,
		children: childrenProp,
		...props
	}: Props = $props();
</script>

<DropdownMenuPrimitive.RadioItem
	bind:ref
	class={cn(
		'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
		className,
	)}
	{...props}
>
	{#snippet children({ checked })}
		<span class="absolute left-2 flex size-3.5 items-center justify-center">
			{#if checked}
				<CircleIcon
					aria-hidden
					class="scale-100 fill-current"
				/>
			{/if}
		</span>
		{@render childrenProp?.({ checked })}
	{/snippet}
</DropdownMenuPrimitive.RadioItem>
