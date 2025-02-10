<script lang="ts">
	import { cn } from '$lib/utils';
	import { type WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLAttributes<HTMLSpanElement>>;

	let {
		ref = $bindable(null),
		class: className,
		children,
		...props
	}: Props = $props();
</script>

<span
	bind:this={ref}
	class={cn('ml-auto text-xs tracking-widest opacity-60', className)}
	{...props}
>
	{@render children?.()}
</span>
