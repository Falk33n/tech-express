<script lang="ts">
	import { Button, type ButtonProps } from '$lib/components/ui/button';

	let { ref = $bindable(null), ...restProps }: ButtonProps = $props();
</script>

<Button
	type="submit"
	bind:ref
	{...restProps}
/>
