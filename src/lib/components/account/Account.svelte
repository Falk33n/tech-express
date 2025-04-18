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
	import { SectionHeading } from '$lib/components/ui/typography';
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

<section class="container py-20">
	<SectionHeading class="md:text-4xl">Account</SectionHeading>
	<div
		class="grid w-full justify-items-center gap-12 sm:items-stretch lg:mx-auto lg:w-[1024px] lg:grid-cols-2 lg:gap-2"
	>
		<Card class="w-full sm:w-md">
			<CardHeader class="pt-14">
				<CardTitle class="text-center text-2xl">Edit Account</CardTitle>
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
			</CardContent>
		</Card>
		<Card class="w-full sm:w-md">
			<CardHeader class="pt-14">
				<CardTitle class="text-destructive text-center text-2xl"
					>Danger Zone</CardTitle
				>
				<CardDescription class="text-center">
					Here you can delete your account.
				</CardDescription>
			</CardHeader>
			<CardContent class="flex flex-col gap-4">
				<DeleteAccountForm form={incomingDeleteFormData} />
			</CardContent>
		</Card>
	</div>
</section>
