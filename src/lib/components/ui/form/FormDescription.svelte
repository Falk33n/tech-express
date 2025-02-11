<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithoutChild } from 'bits-ui';
	import * as FormPrimitive from 'formsnap';

	type Props = WithoutChild<FormPrimitive.DescriptionProps>;

	let { ref = $bindable(null), class: className, ...props }: Props = $props();
</script>

<FormPrimitive.Description
	bind:ref
	class={cn('text-muted-foreground text-[0.8rem]', className)}
	{...props}
/>
