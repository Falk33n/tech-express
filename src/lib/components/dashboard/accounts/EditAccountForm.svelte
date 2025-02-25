<script lang="ts">
	import { invalidateAll } from '$app/navigation';
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
	import { updateAccountAsAdminSchema } from '$lib/schemas';
	import { LoaderIcon } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	type Props = {
		account: Zod.infer<typeof updateAccountAsAdminSchema>;
		form: SuperValidated<Infer<typeof updateAccountAsAdminSchema>>;
		open: boolean;
	};

	let {
		account,
		open = $bindable(false),
		form: incomingFormData,
	}: Props = $props();

	const form = superForm(incomingFormData, {
		validators: zodClient(updateAccountAsAdminSchema),
	});

	const { form: formData, enhance } = form;

	let isSubmitting = $state(false);

	const isDisabled = $derived(
		$formData.email === '' || $formData.role === undefined,
	);

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();

		open = false;
		isSubmitting = true;

		const response = await fetch('/api/account', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify($formData),
		});

		if (!response.ok) {
			toast.error('Could not update account!', {
				description: 'Please try again later.',
			});

			isSubmitting = false;
			return;
		}

		toast.success('Updated!', {
			description: 'The account was edited successfuly.',
		});

		isSubmitting = false;
		invalidateAll();
	};

	onMount(() => {
		$formData = account;
	});
</script>

<form
	method="POST"
	use:enhance
	action="/dashboard/edit/accounts?/editAccount"
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
			Submit
		{/if}
	</FormButton>
</form>
