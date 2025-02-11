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
	import { updateAccountSchema, type UpdateAccount } from '$lib/schemas';
	import { toast } from 'svelte-sonner';
	import {
		superForm,
		type Infer,
		type SuperValidated,
	} from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let {
		form: incomingFormData,
	}: {
		form: SuperValidated<Infer<UpdateAccount>>;
	} = $props();

	const form = superForm(incomingFormData, {
		validators: zodClient(updateAccountSchema),
	});

	const { form: formData, enhance } = form;

	let isSubmitting = $state(false);

	const isDisabled = $derived(
		$formData.email === '' ||
			$formData.password === '' ||
			$formData.newPassword === '',
	);

	const handleSubmit = async (e: SubmitEvent) => {
		if (isDisabled) {
			form.reset();
			return;
		}

		isSubmitting = true;

		const response = await fetch('/api/account', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify($formData),
		});

		if (!response.ok) {
			toast.error('Could not update!', {
				description: 'Please try again later.',
			});

			isSubmitting = false;
			return;
		}

		toast.success('Updated!', {
			description: 'Your profile was updated.',
		});

		isSubmitting = false;
	};
</script>

<form
	method="POST"
	use:enhance
	action="/account?/updateAccount"
	onsubmit={async (e) => await handleSubmit(e)}
	class="flex flex-col gap-4"
>
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
					type="email"
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
		name="password"
		class="w-full"
	>
		<FormControl>
			{#snippet children({ props })}
				<FormLabel class="text-base">Password</FormLabel>
				<Input
					{...props}
					placeholder="••••••••"
					type="password"
					class="mt-1"
					autocomplete="new-password"
					bind:value={$formData.password}
				/>
			{/snippet}
		</FormControl>
		<FormFieldErrors class="text-left" />
	</FormField>
	<FormField
		{form}
		name="newPassword"
		class="w-full"
	>
		<FormControl>
			{#snippet children({ props })}
				<FormLabel class="text-base">New Password</FormLabel>
				<Input
					{...props}
					placeholder="••••••••"
					type="password"
					class="mt-1"
					autocomplete="new-password"
					bind:value={$formData.newPassword}
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
			Update Account
		{/if}
	</FormButton>
</form>
