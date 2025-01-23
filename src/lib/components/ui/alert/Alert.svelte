<script
	lang="ts"
	module
>
	import { type VariantProps, tv } from 'tailwind-variants';

	export const alertVariants = tv({
		base: '[&>svg]:text-foreground relative w-full rounded-lg border px-4 py-3 text-sm [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7',
		variants: {
			variant: {
				default: 'bg-background text-foreground',
				destructive:
					'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	});

	export type AlertVariant = VariantProps<typeof alertVariants>['variant'];
</script>

<script lang="ts">
	import { cn } from '$lib/utils';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: AlertVariant;
	};

	let {
		ref = $bindable(null),
		class: className,
		variant = 'default',
		children,
		...props
	}: Props = $props();
</script>

<div
	bind:this={ref}
	class={cn(alertVariants({ variant }), className)}
	{...props}
	role="alert"
>
	{@render children?.()}
</div>
