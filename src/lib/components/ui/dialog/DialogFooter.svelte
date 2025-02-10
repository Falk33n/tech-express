<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLAttributes<HTMLDivElement>>;

	let {
		ref = $bindable(null),
		class: className,
		children,
		...props
	}: Props = $props();
</script>

<div
	bind:this={ref}
	class={cn(
		'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
		className,
	)}
	{...props}
>
	{@render children?.()}
</div>
