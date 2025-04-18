import { Dialog as DialogPrimitive } from 'bits-ui';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogPortal = DialogPrimitive.Portal;

export { default as DialogContent } from './DialogContent.svelte';
export { default as DialogDescription } from './DialogDescription.svelte';
export { default as DialogFooter } from './DialogFooter.svelte';
export { default as DialogHeader } from './DialogHeader.svelte';
export { default as DialogOverlay } from './DialogOverlay.svelte';
export { default as DialogTitle } from './DialogTitle.svelte';
