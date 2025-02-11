<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef, WithoutChildren } from 'bits-ui';
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	type Props = WithoutChildren<WithElementRef<HTMLTextareaAttributes>>;

	let {
		ref = $bindable(null),
		value = $bindable(),
		class: className,
		...props
	}: Props = $props();
</script>

<textarea
	bind:this={ref}
	bind:value
	class={cn(
		'border-input placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-sm focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
		className,
	)}
	{...props}
></textarea>
