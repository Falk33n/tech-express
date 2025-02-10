<script lang="ts">
	let amount = $state(0);
	async function onclick() {
		const mockdata = {
			name: 'Testing',
			description: 'Lorem ipsum dolar amet',
			imageDescription: 'Lorem ipsum dolar amet',
			imageUrl: 'https://placehold.co/400x400',
			price: 200,
			quantity: 200,
			category: 'monitors',
		};

		amount += 1;

		try {
			const response = await fetch('/api/products', {
				body: JSON.stringify(mockdata),
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
			});

			if (response.ok) {
				console.log('Added');
			}
		} catch (e) {
			console.error(e);
		}
	}
</script>

<button
	onclick={async () => await onclick()}
	class="cursor-pointer">add</button
>
