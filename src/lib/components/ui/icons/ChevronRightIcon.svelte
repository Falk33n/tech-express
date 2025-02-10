<script lang="ts">
	import type { IconProps } from '$lib/components/ui/icons';
	import { cn } from '$lib/utils';

	let { ref = $bindable(), class: className, ...props }: IconProps = $props();
</script>

<svg
	bind:this={ref}
	class={cn('scale-105', className)}
	xmlns="http://www.w3.org/2000/svg"
	width="24"
	height="24"
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	{...props}
>
	<path d="m9 18 6-6-6-6" />
</svg>
