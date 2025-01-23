<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';

	type SubmitEventProps = SubmitEvent & {
		currentTarget: EventTarget & HTMLFormElement;
	};

	const handleSubmit = (e: SubmitEventProps) => {
		e.preventDefault();
	};
</script>

<div class="w-full bg-muted py-20">
	<section class="container mx-auto max-w-2xl text-center">
		<h2 class="mb-4 text-3xl font-bold tracking-tighter">
			Prenumerera på vårt nyhetsbrev
		</h2>
		<p class="mb-8 text-muted-foreground">
			Få de senaste nyheterna och erbjudandena direkt i din inkorg
		</p>
		<form
			class="mx-auto flex max-w-md gap-4"
			onsubmit={handleSubmit}
		>
			<Input
				type="email"
				placeholder="Din e-postadress"
				class="dark:border-muted-foreground/30"
				required
			/>
			<Button type="submit">Prenumerera</Button>
		</form>
	</section>
</div>
