<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLInputAttributes>;

	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		...props
	}: Props = $props();
</script>

<input
	bind:this={ref}
	class={cn(
		'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
		className,
	)}
	bind:value
	{...props}
/>
