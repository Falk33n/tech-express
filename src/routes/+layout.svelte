<script lang="ts">
	import { Footer, Navbar, Newsletter } from '$lib/components/layout';
	import { SkipToMain } from '$lib/components/layout/ui';
	import { Toaster } from '$lib/components/ui/toaster';
	import '$src/app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { setContext } from 'svelte';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();

	setContext('global-layout', data);
</script>

<svelte:head>
	<meta
		name="robots"
		content="index, follow"
	/>
	<meta
		name="author"
		content="TechExpress"
	/>
	<meta
		name="apple-mobile-web-app-title"
		content="Texpress"
	/>
	<meta
		name="description"
		content="Shop the latest tech gadgets, devices, and accessories at great prices. Find top brands and cutting-edge technology in one place."
	/>
	<meta
		name="keywords"
		content="tech, gadgets, electronics, e-commerce, online store, technology products, accessories, smartphones, laptops, gaming equipment"
	/>
	<meta
		property="og:title"
		content="TechExpress"
	/>
	<meta
		property="og:description"
		content="Shop the latest tech gadgets, devices, and accessories at great prices. Find top brands and cutting-edge technology in one place."
	/>
	<meta
		property="og:type"
		content="website"
	/>
	<meta
		property="og:site_name"
		content="TechExpress"
	/>
	<meta
		name="twitter:card"
		content="summary_large_image"
	/>
	<meta
		name="twitter:title"
		content="TechExpress"
	/>
	<meta
		name="twitter:description"
		content="Shop the latest tech gadgets, devices, and accessories at great prices. Find top brands and cutting-edge technology in one place."
	/>
	<meta
		name="twitter:creator"
		content="@techexpress"
	/>
	<meta
		name="twitter:image"
		content="https://tech-express.vercel.app/images/hero.webp"
	/>
	<meta
		name="twitter:url"
		content="https://tech-express.vercel.app/"
	/>
	<meta
		property="og:image"
		content="https://tech-express.vercel.app/images/hero.webp"
	/>
	<meta
		property="og:url"
		content="https://tech-express.vercel.app/"
	/>
	<link
		rel="canonical"
		href="https://tech-express.vercel.app/"
	/>
	<link
		rel="icon"
		type="image/png"
		href="/favicons/favicon-96x96.png"
		sizes="96x96"
	/>
	<link
		rel="icon"
		type="image/svg+xml"
		href="/favicons/favicon.svg"
	/>
	<link
		rel="shortcut icon"
		href="/favicons/favicon.ico"
	/>
	<link
		rel="apple-touch-icon"
		sizes="180x180"
		href="/favicons/apple-touch-icon.png"
	/>
	<link
		rel="manifest"
		href="/favicons/site.webmanifest"
	/>
	<title>Fast Shipping Worldwide - TechExpress</title>
</svelte:head>

<ModeWatcher />
<Toaster richColors />

<SkipToMain />
<Navbar />
<main
	id="main-content"
	class="scroll-mt-20"
>
	{@render children()}
</main>
<Newsletter />
<Footer />
