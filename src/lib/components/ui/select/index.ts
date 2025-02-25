import { Select as SelectPrimitive } from 'bits-ui';

export { default as SelectContent } from './SelectContent.svelte';
export { default as SelectGroupHeading } from './SelectGroupHeading.svelte';
export { default as SelectItem } from './SelectItem.svelte';
export { default as SelectScrollDownButton } from './SelectScrollDownButton.svelte';
export { default as SelectScrollUpButton } from './SelectScrollUpButton.svelte';
export { default as SelectSeparator } from './SelectSeparator.svelte';
export { default as SelectTrigger } from './SelectTrigger.svelte';

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
