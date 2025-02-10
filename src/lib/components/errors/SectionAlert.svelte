<script lang="ts">
	import {
		Alert,
		AlertDescription,
		AlertTitle,
	} from '$lib/components/ui/alert';
	import type { Snippet } from 'svelte';

	type Props = { children?: Snippet<[]> };

	let { children }: Props = $props();
</script>

<Alert
	variant="destructive"
	class="mx-auto w-[calc(100%-2rem)] sm:w-[70%] sm:max-w-[40rem]"
>
	<AlertTitle class="text-lg font-semibold">Något gick fel!</AlertTitle>
	<AlertDescription>
		{@render children?.()}
	</AlertDescription>
</Alert>
