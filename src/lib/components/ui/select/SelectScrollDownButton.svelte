<script lang="ts">
	import { cn } from '$lib/utils';
	import {
		Select as SelectPrimitive,
		type WithoutChildrenOrChild,
	} from 'bits-ui';
	import { ChevronDown } from 'lucide-svelte';

	let {
		ref = $bindable(null),
		class: className,
		...props
	}: WithoutChildrenOrChild<SelectPrimitive.ScrollDownButtonProps> = $props();
</script>

<SelectPrimitive.ScrollDownButton
	bind:ref
	class={cn('flex cursor-default items-center justify-center py-1', className)}
	{...props}
>
	<ChevronDown
		aria-hidden
		class="size-4"
	/>
</SelectPrimitive.ScrollDownButton>
