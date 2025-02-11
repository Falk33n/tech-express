<script lang="ts">
	import { Account } from '$lib/components/account';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<Account
	deleteForm={data.deleteForm}
	updateForm={data.updateForm}
/>
