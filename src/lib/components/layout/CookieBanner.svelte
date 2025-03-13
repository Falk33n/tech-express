<script>
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle,
	} from '$lib/components/ui/card';
	import { XIcon } from 'lucide-svelte';

	let isClosed = $state(false);
</script>

{#if !isClosed}
	<Card
		class="fixed bottom-0 left-0 z-[1000] w-full md:bottom-8 md:left-8 md:w-[550px]"
	>
		<CardHeader>
			<CardTitle class="relative mb-4">
				Manage Cookie Consent

				<Button
					variant="ghost"
					size="icon"
					class="absolute top-1/2 -right-2 -translate-y-1/2"
					onclick={() => (isClosed = true)}
					aria-label="Close Cookie Banner"
				>
					<XIcon
						aria-hidden
						class="size-4 scale-125"
					/>
				</Button>
			</CardTitle>

			<CardDescription>
				To provide the best experiences, we use technologies like cookies to
				store and/or access device information.
			</CardDescription>
		</CardHeader>

		<CardContent>
			<Button class="w-full">Accept</Button>
		</CardContent>
	</Card>
{/if}
