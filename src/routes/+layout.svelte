<script lang="ts">
	import { Footer, Navbar, Newsletter } from '$lib/components/layout';
	import { SkipToMain } from '$lib/components/layout/ui';
	import { Toaster } from '$lib/components/ui/toaster';
	import '$src/app.css';
	import { ModeWatcher } from 'mode-watcher';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta
		name="viewport"
		content="width=device-width, initial-scale=1"
	/>
	<meta
		name="apple-mobile-web-app-title"
		content="Texpress"
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
</svelte:head>

<ModeWatcher />
<Toaster richColors />

<SkipToMain />
<Navbar products={data.products} />
<main
	id="main-content"
	class="scroll-mt-20"
>
	{@render children()}
</main>
<Newsletter form={data.newsletterForm} />
<Footer />
