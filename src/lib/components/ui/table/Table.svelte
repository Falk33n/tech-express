<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLTableAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLTableAttributes>;

	let {
		ref = $bindable(null),
		class: className,
		children,
		...props
	}: Props = $props();
</script>

<div class="relative w-full overflow-auto">
	<table
		bind:this={ref}
		class={cn('w-full caption-bottom text-sm', className)}
		{...props}
	>
		{@render children?.()}
	</table>
</div>
