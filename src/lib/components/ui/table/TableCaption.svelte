<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLAttributes<HTMLElement>>;

	let {
		ref = $bindable(null),
		class: className,
		children,
		...props
	}: Props = $props();
</script>

<caption
	bind:this={ref}
	class={cn('text-muted-foreground mt-4 text-sm', className)}
	{...props}
>
	{@render children?.()}
</caption>
