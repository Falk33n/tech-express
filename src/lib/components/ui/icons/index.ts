import type { WithoutChildren } from 'bits-ui';
import type { SVGAttributes } from 'svelte/elements';

export type IconProps = WithoutChildren<SVGAttributes<SVGSVGElement>> & {
	ref?: SVGSVGElement | null;
};

export { default as CheckIcon } from './CheckIcon.svelte';
export { default as ChevronRightIcon } from './ChevronRightIcon.svelte';
export { default as CircleIcon } from './CircleIcon.svelte';
export { default as ClockIcon } from './ClockIcon.svelte';
export { default as CookieIcon } from './CookieIcon.svelte';
export { default as FacebookIcon } from './FacebookIcon.svelte';
export { default as HeadphonesIcon } from './HeadphonesIcon.svelte';
export { default as InstagramIcon } from './InstagramIcon.svelte';
export { default as LaptopIcon } from './LaptopIcon.svelte';
export { default as LoaderIcon } from './LoaderIcon.svelte';
export { default as LockIcon } from './LockIcon.svelte';
export { default as MailIcon } from './MailIcon.svelte';
export { default as MapPinIcon } from './MapPinIcon.svelte';
export { default as MenuIcon } from './MenuIcon.svelte';
export { default as MinusIcon } from './MinusIcon.svelte';
export { default as MonitorIcon } from './MonitorIcon.svelte';
export { default as MoonIcon } from './MoonIcon.svelte';
export { default as PhoneIcon } from './PhoneIcon.svelte';
export { default as PlusIcon } from './PlusIcon.svelte';
export { default as SearchIcon } from './SearchIcon.svelte';
export { default as ShieldIcon } from './ShieldIcon.svelte';
export { default as ShoppingCartIcon } from './ShoppingCartIcon.svelte';
export { default as SmartphoneIcon } from './SmartphoneIcon.svelte';
export { default as SunIcon } from './SunIcon.svelte';
export { default as XIcon } from './XIcon.svelte';
export { default as YouTubeIcon } from './YouTubeIcon.svelte';
