<script lang="ts">
	import {
		FormButton,
		FormControl,
		FormField,
		FormFieldErrors,
		FormLabel,
	} from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger,
	} from '$lib/components/ui/select';
	import { signUpAsAdminSchema } from '$lib/schemas';
	import { LoaderIcon } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	type Props = {
		form: SuperValidated<Infer<typeof signUpAsAdminSchema>>;
	};

	let { form: incomingFormData }: Props = $props();

	const form = superForm(incomingFormData, {
		validators: zodClient(signUpAsAdminSchema),
	});

	const { form: formData, enhance } = form;

	let isSubmitting = $state(false);

	const isDisabled = $derived(
		$formData.email === '' ||
			$formData.password === '' ||
			$formData.confirmPassword === '',
	);

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();

		isSubmitting = true;

		const response = await fetch('/api/account', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify($formData),
		});

		if (!response.ok) {
			toast.error('Could not create account!', {
				description: 'Please try again later.',
			});

			isSubmitting = false;
			return;
		}

		toast.success('Added!', {
			description: 'The account was created successfuly.',
		});

		isSubmitting = false;
	};
</script>

<form
	method="POST"
	use:enhance
	action="/dashboard/add/accounts?/addAccount"
	onsubmit={async (e) => await handleSubmit(e)}
	class="mx-auto flex w-full flex-col gap-6 sm:w-md"
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
					placeholder="Email"
					type="email"
					class="mt-1"
					autocomplete="off"
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
					class="mt-1"
					type="password"
					autocomplete="off"
					bind:value={$formData.password}
				/>
			{/snippet}
		</FormControl>
		<FormFieldErrors class="text-left" />
	</FormField>
	<FormField
		{form}
		name="confirmPassword"
		class="w-full"
	>
		<FormControl>
			{#snippet children({ props })}
				<FormLabel class="text-base">Confirm Password</FormLabel>
				<Input
					{...props}
					placeholder="••••••••"
					class="mt-1"
					type="password"
					autocomplete="off"
					bind:value={$formData.confirmPassword}
				/>
			{/snippet}
		</FormControl>
		<FormFieldErrors class="text-left" />
	</FormField>
	<FormField
		{form}
		name="role"
		class="w-full"
	>
		<FormControl>
			{#snippet children({ props })}
				<FormLabel class="text-base">Role</FormLabel>
				<Select
					type="single"
					bind:value={$formData.role}
					name={props.name}
				>
					<SelectTrigger
						class="mt-1 capitalize"
						{...props}
					>
						{$formData.role ? $formData.role : 'Select a role'}
					</SelectTrigger>
					<SelectContent>
						<SelectItem
							value="user"
							label="User"
						/>
						<SelectItem
							value="admin"
							label="Admin"
						/>
					</SelectContent>
				</Select>
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
			Create Account
		{/if}
	</FormButton>
</form>
