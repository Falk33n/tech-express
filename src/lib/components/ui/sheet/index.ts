import { Dialog as SheetPrimitive } from 'bits-ui';

export const SheetPrimitiveRoot = SheetPrimitive.Root;
export const SheetPrimitiveClose = SheetPrimitive.Close;
export const SheetPrimitiveTrigger = SheetPrimitive.Trigger;
export const SheetPrimitivePortal = SheetPrimitive.Portal;
export const SheetPrimitiveDescription = SheetPrimitive.Description;
export const SheetPrimitiveOverlay = SheetPrimitive.Overlay;
export const SheetPrimitiveContent = SheetPrimitive.Content;
export const SheetPrimitiveTitle = SheetPrimitive.Title;

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
