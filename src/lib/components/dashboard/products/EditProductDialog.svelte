<script lang="ts">
	import { EditProductForm } from '$lib/components/dashboard/products';
	import { Button } from '$lib/components/ui/button';
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogHeader,
		DialogTitle,
		DialogTrigger,
	} from '$lib/components/ui/dialog';
	import type { EditProduct } from '$lib/schemas';
	import type { Product } from '$lib/types';
	import { PencilIcon } from 'lucide-svelte';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';

	type Props = {
		product: Product;
		form: SuperValidated<Infer<EditProduct>>;
	};

	let { product, form }: Props = $props();

	let open = $state(false);
</script>

<Dialog bind:open>
	<DialogTrigger>
		{#snippet child({ props })}
			<Button
				size="icon"
				{...props}
			>
				<PencilIcon aria-hidden />
			</Button>
		{/snippet}
	</DialogTrigger>
	<DialogContent class="h-screen overflow-auto md:h-[80vh] md:max-h-[700px]">
		<DialogHeader>
			<DialogTitle class="text-2xl">Edit the product</DialogTitle>
			<DialogDescription class="border-b pb-3">
				This action will edit the product in the database. Undoing this action
				will require you to manually revert the product to its previous
				settings.
			</DialogDescription>
		</DialogHeader>
		<EditProductForm
			{product}
			{form}
			bind:open
		/>
	</DialogContent>
</Dialog>
