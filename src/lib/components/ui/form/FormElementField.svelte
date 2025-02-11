<script
	lang="ts"
	module
>
	import type { FormPathLeaves } from 'sveltekit-superforms';
</script>

<script
	lang="ts"
	generics="T extends Record<string, unknown>, U extends FormPathLeaves<T>"
>
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import * as FormPrimitive from 'formsnap';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLAttributes<HTMLDivElement>> &
		FormPrimitive.ElementFieldProps<T, U>;

	let {
		ref = $bindable(null),
		class: className,
		form,
		name,
		children: childrenProp,
		...props
	}: Props = $props();
</script>

<FormPrimitive.ElementField
	{form}
	{name}
>
	{#snippet children({ constraints, errors, tainted, value })}
		<div
			bind:this={ref}
			class={cn('space-y-2', className)}
			{...props}
		>
			{@render childrenProp?.({
				constraints,
				errors,
				tainted,
				value: value as T[U],
			})}
		</div>
	{/snippet}
</FormPrimitive.ElementField>
