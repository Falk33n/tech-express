<script lang="ts">
	import { SignUpForm } from '$lib/components/account';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle,
	} from '$lib/components/ui/card';
</script>

<div class="justify-center grid py-40 min-h-[calc(100vh-4rem)] container">
	<Card class="w-full sm:w-md">
		<CardHeader>
			<CardTitle class="text-2xl text-center">Welcome!</CardTitle>
			<CardDescription class="text-center">
				Register your TechExpress account
			</CardDescription>
		</CardHeader>
		<CardContent class="flex flex-col gap-4">
			<SignUpForm />
		</CardContent>
	</Card>
</div>
