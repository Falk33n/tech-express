<script lang="ts">
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle,
	} from '$lib/components/ui/card';
	import {
		FormButton,
		FormControl,
		FormField,
		FormFieldErrors,
		FormLabel,
	} from '$lib/components/ui/form';
	import { LoaderIcon } from '$lib/components/ui/icons';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { contactSchema, type Contact } from '$lib/schemas';
	import { toast } from 'svelte-sonner';
	import {
		superForm,
		type Infer,
		type SuperValidated,
	} from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { form: incomingFormData }: { form: SuperValidated<Infer<Contact>> } =
		$props();

	const form = superForm(incomingFormData, {
		validators: zodClient(contactSchema),
	});

	const { form: formData, enhance } = form;

	let isSubmitting = $state(false);

	const isDisabled = $derived(
		$formData.email === '' ||
			$formData.message === '' ||
			$formData.name === '' ||
			$formData.subject === '',
	);

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();

		if (isDisabled) {
			form.reset();
			return;
		}

		isSubmitting = true;

		const response = await fetch('/api/contact', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify($formData),
		});

		if (!response.ok) {
			toast.error('Could not create ticket!', {
				description: 'Please try again later.',
			});

			isSubmitting = false;
			return;
		}

		toast.info('Created a support ticket!', {
			description:
				'We have recieved the inquery and will respond to you as soon as we can.',
		});

		isSubmitting = false;
	};
</script>

<Card class="h-full flex-1">
	<CardHeader>
		<CardTitle class="text-xl">Send us a Mail</CardTitle>
	</CardHeader>
	<CardContent>
		<form
			method="POST"
			action="/contact?/contact"
			use:enhance
			onsubmit={async (e) => await handleSubmit(e)}
			class="grid gap-4"
		>
			<FormField
				{form}
				name="name"
				class="w-full"
			>
				<FormControl>
					{#snippet children({ props })}
						<FormLabel class="text-base">Full Name</FormLabel>
						<Input
							{...props}
							placeholder="Your full name"
							class="mt-1"
							autocomplete="given-name"
							bind:value={$formData.name}
						/>
					{/snippet}
				</FormControl>
				<FormFieldErrors class="text-left" />
			</FormField>
			<FormField
				{form}
				name="email"
				class="w-full"
			>
				<FormControl>
					{#snippet children({ props })}
						<FormLabel class="text-base">Email</FormLabel>
						<Input
							{...props}
							placeholder="Your email"
							class="mt-1"
							autocomplete="email"
							bind:value={$formData.email}
						/>
					{/snippet}
				</FormControl>
				<FormFieldErrors class="text-left" />
			</FormField>
			<FormField
				{form}
				name="subject"
				class="w-full"
			>
				<FormControl>
					{#snippet children({ props })}
						<FormLabel class="text-base">Subject</FormLabel>
						<Input
							{...props}
							placeholder="The subject"
							class="mt-1"
							autocomplete="off"
							bind:value={$formData.subject}
						/>
					{/snippet}
				</FormControl>
				<FormFieldErrors class="text-left" />
			</FormField>
			<FormField
				{form}
				name="message"
				class="w-full"
			>
				<FormControl>
					{#snippet children({ props })}
						<FormLabel class="text-base">Message</FormLabel>
						<Textarea
							{...props}
							placeholder="Your inquery"
							class="mt-1"
							autocomplete="off"
							bind:value={$formData.message}
						/>
					{/snippet}
				</FormControl>
				<FormFieldErrors class="text-left" />
			</FormField>
			<FormButton
				disabled={isDisabled || isSubmitting}
				aria-disabled={isDisabled || isSubmitting}
				aria-busy={isSubmitting}
			>
				{#if isSubmitting}
					<LoaderIcon
						aria-hidden
						class="animate-spin"
					/>
				{:else}
					Subscribe
				{/if}
			</FormButton>
		</form>
	</CardContent>
</Card>
