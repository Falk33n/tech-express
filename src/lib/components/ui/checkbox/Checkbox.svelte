<script lang="ts">
	import { cn } from '$lib/utils';
	import {
		Checkbox as CheckboxPrimitive,
		type WithoutChildrenOrChild,
	} from 'bits-ui';
	import { CheckIcon, MinusIcon } from 'lucide-svelte';

	type Props = WithoutChildrenOrChild<CheckboxPrimitive.RootProps>;

	let {
		ref = $bindable(null),
		class: className,
		checked = $bindable(false),
		indeterminate = $bindable(false),
		...props
	}: Props = $props();
</script>

<CheckboxPrimitive.Root
	class={cn(
		'border-primary focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground peer box-content size-4 shrink-0 rounded-sm border shadow focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50',
		className,
	)}
	bind:checked
	bind:ref
	bind:indeterminate
	{...props}
>
	{#snippet children({ checked, indeterminate })}
		<span class="flex items-center justify-center text-current">
			{#if indeterminate}
				<MinusIcon aria-hidden />
			{:else}
				<CheckIcon
					aria-hidden
					class={cn('-mt-0.5', !checked ? 'text-transparent' : '')}
				/>
			{/if}
		</span>
	{/snippet}
</CheckboxPrimitive.Root>
