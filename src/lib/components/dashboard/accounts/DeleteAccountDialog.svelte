<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogHeader,
		DialogTitle,
		DialogTrigger,
	} from '$lib/components/ui/dialog';
	import { LoaderIcon, TrashIcon } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	type Props = {
		email?: string;
	};

	let { email }: Props = $props();

	let open = $state(false);

	let isSubmitting = $state(false);

	const handleSubmit = async () => {
		open = false;
		isSubmitting = true;

		const response = await fetch('/api/account', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email }),
		});

		if (!response.ok) {
			toast.error('Could not delete account!', {
				description: 'Please try again later.',
			});

			isSubmitting = false;
			return;
		}

		toast.info('Deleted!', {
			description: 'The account was deleted successfuly.',
		});

		isSubmitting = false;
		invalidateAll();
	};
</script>

<Dialog bind:open>
	<DialogTrigger>
		{#snippet child({ props })}
			<Button
				variant="destructive"
				size="icon"
				{...props}
			>
				<TrashIcon aria-hidden />
			</Button>
		{/snippet}
	</DialogTrigger>
	<DialogContent>
		<DialogHeader>
			<DialogTitle class="text-2xl">Are you absolutely sure?</DialogTitle>
			<DialogDescription class="border-b pb-3">
				This action cannot be undone. This will permanently delete the user and
				remove its data from the servers.
			</DialogDescription>
		</DialogHeader>
		<Button
			class="w-full"
			variant="destructive"
			onclick={async () => await handleSubmit()}
			disabled={isSubmitting}
			aria-disabled={isSubmitting}
			aria-busy={isSubmitting}
		>
			{#if isSubmitting}
				<LoaderIcon
					aria-hidden
					class="animate-spin"
				/>
			{:else}
				Delete
			{/if}
		</Button>
	</DialogContent>
</Dialog>
