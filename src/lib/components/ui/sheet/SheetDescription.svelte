<script lang="ts">
	import { SheetPrimitiveDescription } from '$lib/components/ui/sheet';
	import { cn } from '$lib/utils';
	import { type DialogDescriptionProps as SheetPrimitiveDescriptionProps } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		...props
	}: SheetPrimitiveDescriptionProps = $props();
</script>

<SheetPrimitiveDescription
	bind:ref
	class={cn('text-sm text-muted-foreground', className)}
	{...props}
/>
