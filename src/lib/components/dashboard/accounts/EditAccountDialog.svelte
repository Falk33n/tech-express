<script lang="ts">
	import { EditAccountForm } from '$lib/components/dashboard/accounts';
	import { Button } from '$lib/components/ui/button';
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogHeader,
		DialogTitle,
		DialogTrigger,
	} from '$lib/components/ui/dialog';
	import type { updateAccountAsAdminSchema } from '$lib/schemas';
	import { PencilIcon } from 'lucide-svelte';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';

	type Props = {
		account: Zod.infer<typeof updateAccountAsAdminSchema>;
		form: SuperValidated<Infer<typeof updateAccountAsAdminSchema>>;
	};

	let { account, form }: Props = $props();

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
	<DialogContent>
		<DialogHeader>
			<DialogTitle class="text-2xl">Edit the account</DialogTitle>
			<DialogDescription class="border-b pb-3">
				This action will edit the user in the database. Undoing this action will
				require you to manually revert the account to its previous settings.
			</DialogDescription>
		</DialogHeader>
		<EditAccountForm
			{account}
			{form}
			bind:open
		/>
	</DialogContent>
</Dialog>
