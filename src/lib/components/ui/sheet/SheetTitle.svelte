<script lang="ts">
	import { SheetPrimitiveTitle } from '$lib/components/ui/sheet';
	import { cn } from '$lib/utils.js';
	import { type DialogTitleProps as SheetPrimitiveTitleProps } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		...props
	}: SheetPrimitiveTitleProps = $props();
</script>

<SheetPrimitiveTitle
	bind:ref
	class={cn('text-lg font-semibold text-foreground', className)}
	{...props}
/>
