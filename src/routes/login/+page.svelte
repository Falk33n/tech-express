<script lang="ts">
	import { Login } from '$lib/components/account';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<Login form={data.loginForm} />
