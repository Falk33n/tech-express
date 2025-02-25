<script lang="ts">
	import { cn } from '$lib/utils';
	import { Select as SelectPrimitive } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		...props
	}: SelectPrimitive.GroupHeadingProps = $props();
</script>

<SelectPrimitive.GroupHeading
	bind:ref
	class={cn('px-2 py-1.5 text-sm font-semibold', className)}
	{...props}
/>
