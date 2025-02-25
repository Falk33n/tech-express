<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLThAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLThAttributes>;

	let {
		ref = $bindable(null),
		class: className,
		children,
		...props
	}: Props = $props();
</script>

<th
	bind:this={ref}
	class={cn(
		'text-muted-foreground h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
		className,
	)}
	{...props}
>
	{@render children?.()}
</th>
