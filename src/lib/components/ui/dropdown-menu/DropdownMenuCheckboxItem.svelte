<script lang="ts">
	import { CheckIcon, MinusIcon } from '$lib/components/ui/icons';
	import { cn } from '$lib/utils';
	import {
		type WithoutChildrenOrChild,
		DropdownMenu as DropdownMenuPrimitive,
	} from 'bits-ui';
	import type { Snippet } from 'svelte';

	type Props =
		WithoutChildrenOrChild<DropdownMenuPrimitive.CheckboxItemProps> & {
			children?: Snippet;
		};

	let {
		ref = $bindable(null),
		class: className,
		children: childrenProp,
		checked = $bindable(false),
		indeterminate = $bindable(false),
		...props
	}: Props = $props();
</script>

<DropdownMenuPrimitive.CheckboxItem
	bind:ref
	bind:checked
	bind:indeterminate
	class={cn(
		'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
		className,
	)}
	{...props}
>
	{#snippet children({ checked, indeterminate })}
		<span class="absolute left-2 flex size-3.5 items-center justify-center">
			{#if indeterminate}
				<MinusIcon aria-hidden />
			{:else}
				<CheckIcon
					aria-hidden
					class={!checked ? 'text-transparent' : ''}
				/>
			{/if}
		</span>
		{@render childrenProp?.()}
	{/snippet}
</DropdownMenuPrimitive.CheckboxItem>
