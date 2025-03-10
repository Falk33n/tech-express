<script lang="ts">
	import { LoginForm } from '$lib/components/account';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle,
	} from '$lib/components/ui/card';
</script>

<div class="container grid min-h-[calc(100vh-4rem)] justify-center py-40">
	<Card class="w-full sm:w-md">
		<CardHeader class="pt-14">
			<CardTitle class="text-center text-2xl">Welcome Back!</CardTitle>
			<CardDescription class="text-center">
				Login to your TechExpress account
			</CardDescription>
		</CardHeader>
		<CardContent class="flex flex-col gap-4">
			<LoginForm />
		</CardContent>
	</Card>
</div>
