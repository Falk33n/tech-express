<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLAttributes<HTMLTableRowElement>>;

	let {
		ref = $bindable(null),
		class: className,
		children,
		...props
	}: Props = $props();
</script>

<tr
	bind:this={ref}
	class={cn(
		'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
		className,
	)}
	{...props}
>
	{@render children?.()}
</tr>
