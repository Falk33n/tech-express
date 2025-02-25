<script lang="ts">
	import { cn } from '$lib/utils';
	import { Select as SelectPrimitive, type WithoutChild } from 'bits-ui';
	import { CheckIcon } from 'lucide-svelte';

	let {
		ref = $bindable(null),
		class: className,
		value,
		label,
		children: childrenProp,
		...props
	}: WithoutChild<SelectPrimitive.ItemProps> = $props();
</script>

<SelectPrimitive.Item
	bind:ref
	{value}
	class={cn(
		'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
		className,
	)}
	{...props}
>
	{#snippet children({ selected, highlighted })}
		<span class="absolute right-2 flex size-3.5 items-center justify-center">
			{#if selected}
				<CheckIcon
					aria-hidden
					class="size-4"
				/>
			{/if}
		</span>
		{#if childrenProp}
			{@render childrenProp({ selected, highlighted })}
		{:else}
			{label || value}
		{/if}
	{/snippet}
</SelectPrimitive.Item>
