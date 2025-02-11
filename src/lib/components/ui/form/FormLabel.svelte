<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { cn } from '$lib/utils';
	import type { WithoutChild } from 'bits-ui';
	import * as FormPrimitive from 'formsnap';

	type Props = WithoutChild<FormPrimitive.LabelProps>;

	let {
		ref = $bindable(null),
		children,
		class: className,
		...props
	}: Props = $props();
</script>

<FormPrimitive.Label
	{...props}
	bind:ref
>
	{#snippet child({ props })}
		<Label
			{...props}
			class={cn('data-[fs-error]:text-destructive', className)}
		>
			{@render children?.()}
		</Label>
	{/snippet}
</FormPrimitive.Label>
