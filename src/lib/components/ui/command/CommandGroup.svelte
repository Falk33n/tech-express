<script lang="ts">
	import { cn } from '$lib/utils';
	import { Command as CommandPrimitive } from 'bits-ui';

	type Props = CommandPrimitive.GroupProps & {
		heading?: string;
	};

	let {
		ref = $bindable(null),
		class: className,
		children,
		heading,
		...props
	}: Props = $props();
</script>

<CommandPrimitive.Group
	class={cn('text-foreground overflow-hidden p-1', className)}
	bind:ref
	{...props}
>
	{#if heading}
		<CommandPrimitive.GroupHeading
			class="text-muted-foreground px-2 py-1.5 text-sm font-medium"
		>
			{heading}
		</CommandPrimitive.GroupHeading>
	{/if}
	<CommandPrimitive.GroupItems {children} />
</CommandPrimitive.Group>
