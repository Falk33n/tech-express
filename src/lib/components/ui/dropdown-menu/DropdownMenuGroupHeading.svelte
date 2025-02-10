<script lang="ts">
	import { cn } from '$lib/utils';
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';

	type Props = DropdownMenuPrimitive.GroupHeadingProps & {
		inset?: boolean;
	};

	let {
		ref = $bindable(null),
		class: className,
		inset,
		...props
	}: Props = $props();
</script>

<DropdownMenuPrimitive.GroupHeading
	bind:ref
	class={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)}
	{...props}
/>
