<script lang="ts">
	import { SignUpForm } from '$lib/components/account';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle,
	} from '$lib/components/ui/card';
	import { type SignUp } from '$lib/schemas';
	import { type Infer, type SuperValidated } from 'sveltekit-superforms';

	let { form: incomingFormData }: { form: SuperValidated<Infer<SignUp>> } =
		$props();
</script>

<div class="container grid min-h-[calc(100vh-4rem)] justify-center py-40">
	<Card class="w-full sm:w-md">
		<CardHeader>
			<CardTitle class="text-center text-2xl">Welcome!</CardTitle>
			<CardDescription class="text-center">
				Register your TechExpress account
			</CardDescription>
		</CardHeader>
		<CardContent class="flex flex-col gap-4">
			<SignUpForm form={incomingFormData} />
		</CardContent>
	</Card>
</div>
