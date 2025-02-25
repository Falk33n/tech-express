<script lang="ts">
	import {
		DeleteProductDialog,
		EditProductDialog,
	} from '$lib/components/dashboard/products';
	import {
		Table,
		TableBody,
		TableCaption,
		TableCell,
		TableHead,
		TableHeader,
		TableRow,
	} from '$lib/components/ui/table';
	import type { EditProduct } from '$lib/schemas';
	import type { Product } from '$lib/types';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';

	type Props = {
		products: Product[];
		form: SuperValidated<Infer<EditProduct>>;
	};

	let { products, form }: Props = $props();
</script>

<Table class="mt-4 border">
	<TableCaption class="sr-only">
		A list of all active products in store.
	</TableCaption>
	<TableHeader>
		<TableRow class="flex px-5 py-2 font-medium">
			<TableHead class="flex w-[40%] min-w-[400px] items-center">
				Name
			</TableHead>
			<TableHead class="flex w-[15%] min-w-[100px] items-center">
				Price
			</TableHead>
			<TableHead class="flex w-[15%] min-w-[100px] items-center">
				Stock
			</TableHead>
			<TableHead class="flex w-[15%] min-w-[100px] items-center">
				Category
			</TableHead>
			<TableHead class="flex w-[15%] min-w-[100px] items-center justify-end">
				Actions
			</TableHead>
		</TableRow>
	</TableHeader>
	<TableBody>
		{#each products as product}
			<TableRow class="flex px-5 py-2 font-medium">
				<TableCell class="flex w-[40%] min-w-[400px] items-center truncate">
					{product.name}
				</TableCell>
				<TableCell class="flex w-[15%] min-w-[100px] items-center truncate">
					${product.price}
				</TableCell>
				<TableCell class="flex w-[15%] min-w-[100px] items-center truncate">
					{product.quantity}
				</TableCell>
				<TableCell
					class="flex w-[15%] min-w-[100px] items-center truncate capitalize"
				>
					{product.category}
				</TableCell>
				<TableCell
					class="flex w-[15%] min-w-[100px] items-center justify-end gap-4"
				>
					<EditProductDialog
						{form}
						{product}
					/>
					<DeleteProductDialog id={product.id} />
				</TableCell>
			</TableRow>
		{/each}
	</TableBody>
</Table>
