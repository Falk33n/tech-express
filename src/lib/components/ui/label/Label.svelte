<script lang="ts">
	import { cn } from '$lib/utils';
	import { Label as LabelPrimitive } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		...props
	}: LabelPrimitive.RootProps = $props();
</script>

<LabelPrimitive.Root
	bind:ref
	class={cn(
		'text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
		className,
	)}
	{...props}
/>
