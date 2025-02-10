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

<h3
	bind:this={ref}
	class={cn(
		'mb-4 font-semibold sm:whitespace-nowrap lg:whitespace-normal',
		className,
	)}
	{...props}
>
	{@render children?.()}
</h3>
