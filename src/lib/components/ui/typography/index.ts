import type { WithElementRef } from 'bits-ui';
import type { HTMLAttributes } from 'svelte/elements';

export type TypographyProps = WithElementRef<
	HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement>
>;

export { default as SectionHeading } from './SectionHeading.svelte';
