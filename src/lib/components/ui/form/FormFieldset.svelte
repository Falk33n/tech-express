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
	import type { WithoutChild } from 'bits-ui';
	import * as FormPrimitive from 'formsnap';

	type Props = WithoutChild<FormPrimitive.FieldsetProps<T, U>>;

	let {
		ref = $bindable(null),
		class: className,
		form,
		name,
		...restProps
	}: Props = $props();
</script>

<FormPrimitive.Fieldset
	bind:ref
	{form}
	{name}
	class={cn('space-y-2', className)}
	{...restProps}
/>
