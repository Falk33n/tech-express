<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle,
	} from '$lib/components/ui/card';
	import { Link } from '$lib/components/ui/link';
	import type { GlobalLayoutProps } from '$lib/types';
	import { XIcon } from 'lucide-svelte';
	import { getContext } from 'svelte';
	import { toast } from 'svelte-sonner';

	let { hasAcceptedCookieConsent }: GlobalLayoutProps =
		getContext('global-layout');

	let isClosed = $state(hasAcceptedCookieConsent);

	async function handleSubmit(hasAccepted: boolean) {
		const response = await fetch('/api/cookies', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ hasAccepted }),
		});

		if (!response.ok) {
			toast.error('Something went wrong.', {
				description: 'Please try again later.',
			});

			return;
		}

		toast.info('Success.', {
			description: 'Thankyou for updating your cookie consent!',
		});

		isClosed = true;
	}
</script>

{#if !isClosed && hasAcceptedCookieConsent === null}
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

		<CardContent class="flex items-center gap-2">
			<Button
				class="flex-1"
				type="submit"
				aria-label="Accept cookie policy"
				onclick={() => handleSubmit(true)}
			>
				Accept
			</Button>

			<Button
				class="flex-1"
				variant="destructive"
				type="submit"
				aria-label="Reject cookie policy"
				onclick={() => handleSubmit(false)}
			>
				Reject
			</Button>
		</CardContent>
		<CardFooter>
			<p class="text-xs">
				Want to learn more about how we use cookies?
				<Link
					href="/cookie-policy"
					class="text-primary"
				>
					Go to our cookie policy page
				</Link>.
			</p>
		</CardFooter>
	</Card>
{/if}
