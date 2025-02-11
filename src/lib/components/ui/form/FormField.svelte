<script
	lang="ts"
	module
>
	import type { FormPath } from 'sveltekit-superforms';
</script>

<script
	lang="ts"
	generics="T extends Record<string, unknown>, U extends FormPath<T>"
>
	import { cn } from '$lib/utils';
	import type { WithElementRef, WithoutChildren } from 'bits-ui';
	import * as FormPrimitive from 'formsnap';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = FormPrimitive.FieldProps<T, U> &
		WithoutChildren<WithElementRef<HTMLAttributes<HTMLDivElement>>>;

	let {
		ref = $bindable(null),
		class: className,
		form,
		name,
		children: childrenProp,
		...props
	}: Props = $props();
</script>

<FormPrimitive.Field
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
</FormPrimitive.Field>
