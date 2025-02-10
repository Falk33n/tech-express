<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLAnchorAttributes>;

	let {
		ref = $bindable(null),
		class: className,
		target,
		rel = target === '_blank' ? 'noopener noreferrer' : undefined,
		children,
		...props
	}: Props = $props();
</script>

<a
	bind:this={ref}
	class={cn(
		'rounded-md transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring [&_svg]:pointer-events-none [&_svg]:size-4',
		className,
	)}
	{rel}
	{target}
	{...props}
>
	{@render children?.()}
</a>
