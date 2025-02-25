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

<thead
	bind:this={ref}
	class={cn('[&_tr]:border-b', className)}
	{...props}
>
	{@render children?.()}
</thead>
