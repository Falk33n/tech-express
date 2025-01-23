<script
	lang="ts"
	module
>
	import { tv, type VariantProps } from 'tailwind-variants';

	export const sheetVariants = tv({
		base: 'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 gap-4 p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
		variants: {
			side: {
				top: 'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 border-b',
				bottom:
					'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 border-t',
				left: 'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
				right:
					'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
			},
		},
		defaultVariants: {
			side: 'right',
		},
	});

	export type Side = VariantProps<typeof sheetVariants>['side'];
</script>

<script lang="ts">
	import {
		SheetOverlay,
		SheetPrimitiveClose,
		SheetPrimitiveContent,
		SheetPrimitivePortal,
	} from '$lib/components/ui/sheet';
	import { cn } from '$lib/utils';
	import {
		type DialogContentProps as SheetPrimitiveContentProps,
		type DialogPortalProps as SheetPrimitivePortalProps,
		type WithoutChildrenOrChild,
	} from 'bits-ui';
	import { X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	type Props = WithoutChildrenOrChild<SheetPrimitiveContentProps> & {
		portalProps?: SheetPrimitivePortalProps;
		side?: Side;
		children: Snippet;
	};

	let {
		ref = $bindable(null),
		class: className,
		portalProps,
		side = 'right',
		children,
		...props
	}: Props = $props();
</script>

<SheetPrimitivePortal {...portalProps}>
	<SheetOverlay />
	<SheetPrimitiveContent
		bind:ref
		class={cn(sheetVariants({ side }), className)}
		{...props}
	>
		{@render children?.()}
		<SheetPrimitiveClose
			class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
			aria-label="Stäng"
		>
			<X
				aria-hidden
				class="size-4"
			/>
		</SheetPrimitiveClose>
	</SheetPrimitiveContent>
</SheetPrimitivePortal>
