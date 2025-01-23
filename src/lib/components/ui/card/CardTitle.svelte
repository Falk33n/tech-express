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
		level = 3,
		children,
		...props
	}: Props = $props();
</script>

<div
	role="heading"
	aria-level={level}
	bind:this={ref}
	class={cn('font-semibold leading-none tracking-tight', className)}
	{...props}
>
	{@render children?.()}
</div>
