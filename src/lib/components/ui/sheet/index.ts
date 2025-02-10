import { Dialog as SheetPrimitive } from 'bits-ui';

export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;

export {
	default as SheetContent,
	sheetVariants,
	type Side,
} from './SheetContent.svelte';
export { default as SheetDescription } from './SheetDescription.svelte';
export { default as SheetFooter } from './SheetFooter.svelte';
export { default as SheetHeader } from './SheetHeader.svelte';
export { default as SheetOverlay } from './SheetOverlay.svelte';
export { default as SheetTitle } from './SheetTitle.svelte';
