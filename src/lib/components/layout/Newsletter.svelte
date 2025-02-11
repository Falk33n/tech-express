<script lang="ts">
	import {
		FormButton,
		FormControl,
		FormField,
		FormFieldErrors,
		FormLabel,
	} from '$lib/components/ui/form';
	import { LoaderIcon } from '$lib/components/ui/icons';
	import { Input } from '$lib/components/ui/input';
	import { SectionHeading } from '$lib/components/ui/typography';
	import { emailSchema, type Email } from '$lib/schemas';
	import { toast } from 'svelte-sonner';
	import {
		superForm,
		type Infer,
		type SuperValidated,
	} from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { form: incomingFormData }: { form: SuperValidated<Infer<Email>> } =
		$props();

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
							class="border-muted-foreground/25 dark:border-muted-foreground/50 bg-background"
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
