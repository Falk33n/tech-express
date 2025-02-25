<script lang="ts">
	import {
		FormButton,
		FormControl,
		FormField,
		FormFieldErrors,
		FormLabel,
	} from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { purchaseSchema } from '$lib/schemas';
	import { LoaderIcon } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	type Props = {
		form: SuperValidated<Infer<typeof purchaseSchema>>;
	};

	let { form: incomingFormData }: Props = $props();

	const form = superForm(incomingFormData, {
		validators: zodClient(purchaseSchema),
	});

	const { form: formData, enhance } = form;

	let isSubmitting = $state(false);

	const isDisabled = $derived(
		$formData.cardHolder === '' ||
			$formData.expiryDate === '' ||
			$formData.cardNumber === '' ||
			$formData.cvv === '',
	);

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();

		isSubmitting = true;

		toast.success('Thankyou!', {
			description: 'Your purchase went through successfully!',
		});

		isSubmitting = false;
	};
</script>

<form
	method="POST"
	use:enhance
	action="/?/purchase"
	onsubmit={async (e) => await handleSubmit(e)}
	class="flex flex-col gap-3"
>
	<FormField
		{form}
		name="cardNumber"
		class="w-full"
	>
		<FormControl>
			{#snippet children({ props })}
				<FormLabel class="text-base">Card Number</FormLabel>
				<Input
					{...props}
					placeholder="Card number"
					class="input mt-1"
					autocomplete="off"
					bind:value={$formData.cardNumber}
				/>
			{/snippet}
		</FormControl>
		<FormFieldErrors class="text-left" />
	</FormField>
	<FormField
		{form}
		name="cardHolder"
		class="w-full"
	>
		<FormControl>
			{#snippet children({ props })}
				<FormLabel class="text-base">Card Holder</FormLabel>
				<Input
					{...props}
					placeholder="Card holder"
					class="mt-1"
					autocomplete="off"
					bind:value={$formData.cardHolder}
				/>
			{/snippet}
		</FormControl>
		<FormFieldErrors class="text-left" />
	</FormField>
	<div class="flex items-center gap-4">
		<FormField
			{form}
			name="expiryDate"
			class="w-full"
		>
			<FormControl>
				{#snippet children({ props })}
					<FormLabel class="text-base">Expiry Date</FormLabel>
					<Input
						{...props}
						placeholder="MM/YY"
						class="mt-1"
						autocomplete="off"
						bind:value={$formData.expiryDate}
					/>
				{/snippet}
			</FormControl>
			<FormFieldErrors class="text-left" />
		</FormField>
		<FormField
			{form}
			name="cvv"
			class="w-full"
		>
			<FormControl>
				{#snippet children({ props })}
					<FormLabel class="text-base">CVV</FormLabel>
					<Input
						{...props}
						placeholder="••••"
						class="mt-1"
						type="password"
						autocomplete="off"
						bind:value={$formData.cvv}
					/>
				{/snippet}
			</FormControl>
			<FormFieldErrors class="text-left" />
		</FormField>
	</div>
	<FormButton
		disabled={isDisabled || isSubmitting}
		aria-disabled={isDisabled || isSubmitting}
		aria-busy={isSubmitting}
		class="mt-3 w-full"
	>
		{#if isSubmitting}
			<LoaderIcon
				aria-hidden
				class="animate-spin"
			/>
		{:else}
			Complete Purchase
		{/if}
	</FormButton>
</form>
