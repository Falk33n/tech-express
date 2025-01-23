<script lang="ts">
	import { Footer, Navbar } from '$lib/components/layout';
	import { Sonner } from '$lib/components/ui/sonner';
	import '$src/app.css';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<ModeWatcher />
<Sonner />
<div class="min-h-screen w-full bg-background text-foreground">
	<Navbar />
	<main id="main">{@render children()}</main>
	<Footer />
</div>
