<script lang="ts">
	import type { TypographyProps } from '$lib/components/ui/typography';
	import { cn } from '$lib/utils';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...props
	}: TypographyProps = $props();
</script>

<h2
	bind:this={ref}
	class={cn(
		'mx-auto mb-12 w-fit text-3xl font-bold tracking-tighter',
		className,
	)}
	{...props}
>
	{@render children?.()}
</h2>
