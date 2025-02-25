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
	import { Textarea } from '$lib/components/ui/textarea';
	import type { EditProduct } from '$lib/schemas';
	import { editProductSchema } from '$lib/schemas';
	import type { Product } from '$lib/types';
	import { LoaderIcon } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	type Props = {
		product: Product;
		form: SuperValidated<Infer<EditProduct>>;
		open: boolean;
	};

	let {
		product,
		open = $bindable(false),
		form: incomingFormData,
	}: Props = $props();

	const form = superForm(incomingFormData, {
		validators: zodClient(editProductSchema),
	});

	const { form: formData, enhance } = form;

	let isSubmitting = $state(false);

	const isDisabled = $derived(
		$formData.description === '' ||
			$formData.imageDescription === '' ||
			$formData.imageUrl === '' ||
			$formData.name === '' ||
			$formData.price === undefined ||
			$formData.quantity === undefined ||
			$formData.category === undefined,
	);

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();

		open = false;
		isSubmitting = true;

		const productDataWithId = { ...$formData, id: product.id };

		const response = await fetch('/api/products', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(productDataWithId),
		});

		if (!response.ok) {
			toast.error('Could not update product!', {
				description: 'Please try again later.',
			});

			isSubmitting = false;
			return;
		}

		toast.success('Updated!', {
			description: 'The product was edited successfuly.',
		});

		isSubmitting = false;
		invalidateAll();
	};

	onMount(() => {
		$formData = product;
	});
</script>

<form
	method="POST"
	use:enhance
	action="/dashboard/edit/products?/editProduct"
	onsubmit={async (e) => await handleSubmit(e)}
	class="flex flex-col gap-4"
>
	<FormField
		{form}
		name="name"
		class="w-full"
	>
		<FormControl>
			{#snippet children({ props })}
				<FormLabel class="text-base">Product Name</FormLabel>
				<Input
					{...props}
					placeholder="Product Name"
					class="mt-1"
					autocomplete="off"
					bind:value={$formData.name}
				/>
			{/snippet}
		</FormControl>
		<FormFieldErrors class="text-left" />
	</FormField>
	<FormField
		{form}
		name="description"
		class="w-full"
	>
		<FormControl>
			{#snippet children({ props })}
				<FormLabel class="text-base">Product Description</FormLabel>
				<Textarea
					{...props}
					placeholder="Product Description"
					class="mt-1"
					autocomplete="off"
					rows={10}
					bind:value={$formData.description}
				/>
			{/snippet}
		</FormControl>
		<FormFieldErrors class="text-left" />
	</FormField>
	<FormField
		{form}
		name="price"
		class="w-full"
	>
		<FormControl>
			{#snippet children({ props })}
				<FormLabel class="text-base">Product Price ($)</FormLabel>
				<Input
					{...props}
					placeholder="Product Price"
					type="number"
					step="any"
					class="mt-1"
					autocomplete="off"
					bind:value={$formData.price}
				/>
			{/snippet}
		</FormControl>
		<FormFieldErrors class="text-left" />
	</FormField>
	<FormField
		{form}
		name="quantity"
		class="w-full"
	>
		<FormControl>
			{#snippet children({ props })}
				<FormLabel class="text-base">Products in Stock</FormLabel>
				<Input
					{...props}
					placeholder="Products in Stock"
					type="number"
					class="mt-1"
					autocomplete="off"
					bind:value={$formData.quantity}
				/>
			{/snippet}
		</FormControl>
		<FormFieldErrors class="text-left" />
	</FormField>
	<FormField
		{form}
		name="imageDescription"
		class="w-full"
	>
		<FormControl>
			{#snippet children({ props })}
				<FormLabel class="text-base">Product Image Description</FormLabel>
				<Textarea
					{...props}
					placeholder="Product Image Description"
					class="mt-1"
					autocomplete="off"
					rows={4}
					bind:value={$formData.imageDescription}
				/>
			{/snippet}
		</FormControl>
		<FormFieldErrors class="text-left" />
	</FormField>
	<FormField
		{form}
		name="imageUrl"
		class="w-full"
	>
		<FormControl>
			{#snippet children({ props })}
				<FormLabel class="text-base">Product Image URL</FormLabel>
				<Input
					{...props}
					placeholder="Product Image URL"
					class="mt-1"
					autocomplete="off"
					bind:value={$formData.imageUrl}
				/>
			{/snippet}
		</FormControl>
		<FormFieldErrors class="text-left" />
	</FormField>
	<FormField
		{form}
		name="category"
		class="w-full"
	>
		<FormControl>
			{#snippet children({ props })}
				<FormLabel class="text-base">Product Category</FormLabel>
				<Select
					type="single"
					bind:value={$formData.category}
					name={props.name}
				>
					<SelectTrigger
						class="mt-1 capitalize"
						{...props}
					>
						{$formData.category ? $formData.category : 'Select a category'}
					</SelectTrigger>
					<SelectContent>
						<SelectItem
							value="phones"
							label="Phones"
						/>
						<SelectItem
							value="computers"
							label="Computers"
						/>
						<SelectItem
							value="monitors"
							label="Monitors"
						/>
						<SelectItem
							value="accessories"
							label="Accessories"
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
