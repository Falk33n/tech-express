<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { LoaderIcon } from '$lib/components/ui/icons';
	import { Input } from '$lib/components/ui/input';
	import { SectionHeading } from '$lib/components/ui/typography';
	import { toast } from 'svelte-sonner';

	let input = $state({ value: '' });
	let isFormSubmitting = $state({ value: false });

	const isButtonDisabled = $derived({ value: input.value === '' });

	async function handleSubmit() {
		if (input.value.trim() === '') {
			input.value = '';
			return;
		}

		const storedInputValue = input.value;

		isFormSubmitting.value = true;
		input.value = '';

		const response = await fetch('/api/newsletter', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email: storedInputValue }),
		});

		if (!response.ok) {
			toast.error('Something went wrong.', {
				description: 'Please try again later.',
			});

			isFormSubmitting.value = false;

			return;
		}

		toast.info('Success.', {
			description: 'Thankyou for subscribing to our newsletter!',
		});

		isFormSubmitting.value = false;
	}

	type KeyboardEventProps = KeyboardEvent & {
		currentTarget: EventTarget & HTMLInputElement;
	};

	async function handleInputSubmitForm(event: KeyboardEventProps) {
		if (event.key === 'Enter') {
			event.preventDefault();
			await handleSubmit();
		}
	}
</script>

<div class="bg-muted muted-background w-full py-20">
	<section class="container mx-auto max-w-2xl text-center">
		<SectionHeading class="mb-4 backdrop-blur-xs">
			Subscribe to our newsletter
		</SectionHeading>
		<p class="mx-auto mb-8 w-fit backdrop-blur-xs">
			Get the latest news and deals delivered directly to your inbox.
		</p>
		<form
			class="mx-auto flex max-w-md gap-4"
			onsubmit={async (event) => {
				event.preventDefault();
				await handleSubmit();
			}}
		>
			<Input
				bind:value={input.value}
				type="email"
				name="email"
				placeholder="Your email address"
				autocomplete="email"
				class="border-muted-foreground/25 dark:border-muted-foreground/50 bg-background"
				onkeydown={async (event) => await handleInputSubmitForm(event)}
				required
			/>
			<Button
				disabled={isButtonDisabled.value || isFormSubmitting.value}
				aria-disabled={isButtonDisabled.value || isFormSubmitting.value}
				aria-busy={isFormSubmitting.value}
				type="submit"
			>
				{#if isFormSubmitting.value}
					<LoaderIcon
						aria-hidden
						class="animate-spin"
					/>
				{:else}
					Subscribe
				{/if}
			</Button>
		</form>
	</section>
</div>
