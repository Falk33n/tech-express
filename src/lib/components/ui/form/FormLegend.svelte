<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithoutChild } from 'bits-ui';
	import * as FormPrimitive from 'formsnap';

	type Props = WithoutChild<FormPrimitive.LegendProps>;

	let { ref = $bindable(null), class: className, ...props }: Props = $props();
</script>

<FormPrimitive.Legend
	bind:ref
	{...props}
	class={cn(
		'data-[fs-error]:text-destructive text-sm leading-none font-medium',
		className,
	)}
/>
