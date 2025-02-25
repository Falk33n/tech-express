<script lang="ts">
	import {
		DeleteAccountDialog,
		EditAccountDialog,
	} from '$lib/components/dashboard/accounts';
	import {
		Table,
		TableBody,
		TableCaption,
		TableCell,
		TableHead,
		TableHeader,
		TableRow,
	} from '$lib/components/ui/table';
	import type { updateAccountAsAdminSchema } from '$lib/schemas';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';

	type Props = {
		accounts: Zod.infer<typeof updateAccountAsAdminSchema>[];
		form: SuperValidated<Infer<typeof updateAccountAsAdminSchema>>;
	};

	let { accounts, form }: Props = $props();
</script>

<Table class="mt-4 border">
	<TableCaption class="sr-only">
		A list of all active products in store.
	</TableCaption>
	<TableHeader>
		<TableRow class="flex px-5 py-2 font-medium">
			<TableHead class="flex w-[90%] min-w-[300px] items-center">
				Email
			</TableHead>
			<TableHead class="flex w-[10%] min-w-[100px] items-center justify-end">
				Role
			</TableHead>
			<TableHead class="flex w-[10%] min-w-[100px] items-center justify-end">
				Actions
			</TableHead>
		</TableRow>
	</TableHeader>
	<TableBody>
		{#each accounts as account}
			<TableRow class="flex px-5 py-2 font-medium">
				<TableCell class="flex w-[90%] min-w-[300px] items-center truncate">
					{account.email}
				</TableCell>
				<TableCell
					class="flex w-[10%] min-w-[100px] items-center justify-end truncate capitalize"
				>
					{account.role}
				</TableCell>
				<TableCell
					class="flex w-[10%] min-w-[100px] items-center justify-end gap-4"
				>
					<EditAccountDialog
						{form}
						{account}
					/>
					<DeleteAccountDialog email={account.email} />
				</TableCell>
			</TableRow>
		{/each}
	</TableBody>
</Table>
