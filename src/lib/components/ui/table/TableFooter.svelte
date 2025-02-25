<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLAttributes<HTMLTableSectionElement>>;

	let {
		ref = $bindable(null),
		class: className,
		children,
		...props
	}: Props = $props();
</script>

<tfoot
	bind:this={ref}
	class={cn('bg-muted/50 font-medium', className)}
	{...props}
>
	{@render children?.()}
</tfoot>
