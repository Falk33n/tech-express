<script lang="ts">
	import {
		FormButton,
		FormControl,
		FormField,
		FormFieldErrors,
		FormLabel,
	} from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { SectionHeading } from '$lib/components/ui/typography';
	import { emailSchema } from '$lib/schemas';
	import type { GlobalLayoutProps } from '$lib/types';
	import { LoaderIcon } from 'lucide-svelte';
	import { getContext } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { newsletterForm: incomingFormData }: GlobalLayoutProps =
		getContext('global-layout');

	const form = superForm(incomingFormData, {
		validators: zodClient(emailSchema),
		clearOnSubmit: 'errors-and-message',
	});

	const { form: formData, enhance } = form;

	let isFormSubmitting = $state({ value: false });

	const isButtonDisabled = $derived({ value: $formData.email === '' });

	async function handleSubmit() {
		if ($formData.email.trim() === '') {
			$formData.email = '';
			return;
		}

		isFormSubmitting.value = true;

		const response = await fetch('/api/newsletter', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify($formData),
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

<div class="bg-muted py-20 w-full muted-background">
	<section class="mx-auto max-w-2xl text-center container">
		<SectionHeading class="backdrop-blur-xs mb-4">
			Subscribe to our newsletter
		</SectionHeading>
		<p class="backdrop-blur-xs mx-auto mb-8 w-fit">
			Get the latest news and deals delivered directly to your inbox.
		</p>
		<form
			class="flex gap-4 mx-auto max-w-md"
			method="POST"
			action="/?/newsletter"
			use:enhance
			onsubmit={async (event) => {
				event.preventDefault();
				await handleSubmit();
			}}
		>
			<FormField
				{form}
				name="email"
				class="w-full"
			>
				<FormControl>
					{#snippet children({ props })}
						<FormLabel class="sr-only">Email</FormLabel>
						<Input
							{...props}
							placeholder="Your email address"
							autocomplete="email"
							onkeydown={async (event) => await handleInputSubmitForm(event)}
							class="bg-background border-muted-foreground/25 dark:border-muted-foreground/50"
							bind:value={$formData.email}
						/>
					{/snippet}
				</FormControl>
				<FormFieldErrors class="text-left" />
			</FormField>
			<FormButton
				disabled={isButtonDisabled.value || isFormSubmitting.value}
				aria-disabled={isButtonDisabled.value || isFormSubmitting.value}
				aria-busy={isFormSubmitting.value}
			>
				{#if isFormSubmitting.value}
					<LoaderIcon
						aria-hidden
						class="animate-spin"
					/>
				{:else}
					Subscribe
				{/if}
			</FormButton>
		</form>
	</section>
</div>
