<script lang="ts">
	import { goto } from '$app/navigation';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import {
		FormButton,
		FormControl,
		FormField,
		FormFieldErrors,
		FormLabel,
	} from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Link } from '$lib/components/ui/link';
	import { loginSchema, type Login } from '$lib/schemas';
	import { LoaderIcon } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import {
		superForm,
		type Infer,
		type SuperValidated,
	} from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { form: incomingFormData }: { form: SuperValidated<Infer<Login>> } =
		$props();

	const form = superForm(incomingFormData, {
		validators: zodClient(loginSchema),
	});

	const { form: formData, enhance } = form;

	let isSubmitting = $state(false);

	const isDisabled = $derived(
		$formData.email === '' || $formData.password === '',
	);

	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();

		if (isDisabled) {
			form.reset();
			return;
		}

		isSubmitting = true;

		const response = await fetch('/api/auth', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify($formData),
		});

		if (!response.ok) {
			toast.error('Could not login!', {
				description: 'Please try again later.',
			});

			isSubmitting = false;
			return;
		}

		toast.success('Logged in!', {
			description: 'The authentication was successful.',
		});

		isSubmitting = false;

		goto('/');
	};
</script>

<form
	method="POST"
	use:enhance
	action="/login?/login"
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
					placeholder="Your email"
					type="email"
					class="mt-1"
					autocomplete="email"
					bind:value={$formData.email}
				/>
			{/snippet}
		</FormControl>
		<FormFieldErrors class="text-left" />
	</FormField>
	<FormField
		{form}
		name="password"
		class="w-full"
	>
		<FormControl>
			{#snippet children({ props })}
				<FormLabel class="text-base">Password</FormLabel>
				<Input
					{...props}
					placeholder="••••••••"
					type="password"
					class="mt-1"
					autocomplete="current-password"
					bind:value={$formData.password}
				/>
			{/snippet}
		</FormControl>
		<FormFieldErrors class="text-left" />
	</FormField>
	<FormField
		{form}
		name="rememberMe"
		class="flex w-full items-center gap-2"
	>
		<FormControl>
			{#snippet children({ props })}
				<Checkbox
					{...props}
					bind:checked={$formData.rememberMe}
				/>
				<FormLabel class="text-base">Remember Me</FormLabel>
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
			Login
		{/if}
	</FormButton>
	<p class="text-center text-sm">
		Don't have an account?
		<Link
			href="/signup"
			aria-label="Go to the signup page"
			class="text-primary hover:underline hover:underline-offset-2"
		>
			Sign up
		</Link>
	</p>
</form>
