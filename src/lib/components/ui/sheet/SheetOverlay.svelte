<script lang="ts">
	import { SheetPrimitiveOverlay } from '$lib/components/ui/sheet';
	import { cn } from '$lib/utils';
	import { type DialogOverlayProps as SheetPrimitiveOverlayProps } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		...props
	}: SheetPrimitiveOverlayProps = $props();
</script>

<SheetPrimitiveOverlay
	bind:ref
	class={cn(
		'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
		className,
	)}
	{...props}
/>
