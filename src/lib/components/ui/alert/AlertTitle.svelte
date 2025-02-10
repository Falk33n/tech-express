<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		level?: 1 | 2 | 3 | 4 | 5 | 6;
	};

	let {
		ref = $bindable(null),
		class: className,
		level = 5,
		children,
		...props
	}: Props = $props();
</script>

<div
	bind:this={ref}
	aria-level={level}
	class={cn('mb-1 font-medium leading-none tracking-tight', className)}
	{...props}
>
	{@render children?.()}
</div>
