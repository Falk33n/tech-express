<script lang="ts">
	import { Command } from '$lib/components/ui/command';
	import { Dialog, DialogContent } from '$lib/components/ui/dialog';
	import {
		type WithoutChildrenOrChild,
		Command as CommandPrimitive,
		Dialog as DialogPrimitive,
	} from 'bits-ui';
	import type { Snippet } from 'svelte';

	type Props = WithoutChildrenOrChild<DialogPrimitive.RootProps> &
		WithoutChildrenOrChild<CommandPrimitive.RootProps> & {
			portalProps?: DialogPrimitive.PortalProps;
			children: Snippet;
		};

	let {
		open = $bindable(false),
		ref = $bindable(null),
		value = $bindable(''),
		portalProps,
		children,
		...props
	}: Props = $props();
</script>

<Dialog
	bind:open
	{...props}
>
	<DialogContent
		class="overflow-hidden p-0"
		{portalProps}
	>
		<Command
			class="[&_[data-cmdk-group-heading]]:px-2 [&_[data-cmdk-group-heading]]:font-medium [&_[data-cmdk-group]]:px-2 [&_[data-cmdk-group]:not([hidden])_~[data-cmdk-group]]:pt-0 [&_[data-cmdk-input-wrapper]_svg]:h-5 [&_[data-cmdk-input-wrapper]_svg]:w-5 [&_[data-cmdk-input]]:h-12 [&_[data-cmdk-item]]:px-2 [&_[data-cmdk-item]]:py-3 [&_[data-cmdk-item]_svg]:h-5 [&_[data-cmdk-item]_svg]:w-5"
			{...props}
			bind:value
			bind:ref
			{children}
		/>
	</DialogContent>
</Dialog>
