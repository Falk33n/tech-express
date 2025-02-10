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
	<circle
		cx="11"
		cy="11"
		r="8"
	/>
	<path d="m21 21-4.3-4.3" />
</svg>
