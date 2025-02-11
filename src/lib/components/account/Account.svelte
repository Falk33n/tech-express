<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		DeleteAccountForm,
		UpdateAccountForm,
	} from '$lib/components/account';
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle,
	} from '$lib/components/ui/card';
	import { type SignUp, type UpdateAccount } from '$lib/schemas';
	import { toast } from 'svelte-sonner';
	import { type Infer, type SuperValidated } from 'sveltekit-superforms';

	let {
		updateForm: incomingUpdateFormData,
		deleteForm: incomingDeleteFormData,
	}: {
		updateForm: SuperValidated<Infer<UpdateAccount>>;
		deleteForm: SuperValidated<Infer<SignUp>>;
	} = $props();

	async function logout(e: SubmitEvent) {
		e.preventDefault();

		const response = await fetch('/api/auth', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			toast.error('Could not logout!', {
				description: 'Please try again later.',
			});

			return;
		}

		toast.info('Logged out!', {
			description: 'Your profile was logged out.',
		});

		goto('/');
	}
</script>

<div class="container grid min-h-[calc(100vh-4rem)] justify-center py-20">
	<Card class="w-full sm:w-md">
		<CardHeader class="pt-14">
			<CardTitle class="text-center text-2xl">Account</CardTitle>
			<CardDescription class="text-center">
				Here you can change your account information. Leave the fields you do
				NOT want to update blank.
			</CardDescription>
		</CardHeader>
		<CardContent class="flex flex-col gap-4">
			<UpdateAccountForm form={incomingUpdateFormData} />
			<form
				method="POST"
				onsubmit={async (e) => await logout(e)}
			>
				<p class="mt-4 mb-2 text-center text-sm font-medium">
					Do you wish to log out of your account?
				</p>
				<Button
					type="submit"
					variant="outline"
					class="w-full"
				>
					Log out
				</Button>
			</form>
			<h4 class="text-destructive mt-3 text-center text-xl font-bold">
				Danger Zone
			</h4>
			<DeleteAccountForm form={incomingDeleteFormData} />
		</CardContent>
	</Card>
</div>
