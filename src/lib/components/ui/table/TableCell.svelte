<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLTdAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLTdAttributes>;

	let {
		ref = $bindable(null),
		class: className,
		children,
		...props
	}: Props = $props();
</script>

<td
	bind:this={ref}
	class={cn(
		'p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
		className,
	)}
	{...props}
>
	{@render children?.()}
</td>
