<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import { cn } from '$lib/utils';
	import type { Separator as SeparatorPrimitive } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		...props
	}: SeparatorPrimitive.RootProps = $props();
</script>

<Separator
	bind:ref
	class={cn('bg-muted -mx-1 my-1 h-px', className)}
	{...props}
/>
