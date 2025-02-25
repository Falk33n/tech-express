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

<tbody
	bind:this={ref}
	class={cn('[&_tr:last-child]:border-0', className)}
	{...props}
>
	{@render children?.()}
</tbody>
