<script lang="ts">
	import { SignUp } from '$lib/components/account';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<SignUp form={data.signupForm} />
