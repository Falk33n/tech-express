<script lang="ts">
	import { cn } from '$lib/utils';
	import { Command as CommandPrimitive } from 'bits-ui';
	import { SearchIcon } from 'lucide-svelte';

	let {
		ref = $bindable(null),
		class: className,
		value = $bindable(''),
		...props
	}: CommandPrimitive.InputProps = $props();
</script>

<div
	class="flex items-center px-3"
	data-command-input-wrapper=""
>
	<SearchIcon
		aria-hidden
		class="mr-2 shrink-0 scale-75 opacity-50"
	/>
	<CommandPrimitive.Input
		class={cn(
			'placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-base outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
			className,
		)}
		bind:ref
		bind:value
		{...props}
	/>
</div>
