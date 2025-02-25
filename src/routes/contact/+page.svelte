<script lang="ts">
	import {
		Contact,
		ContactForm,
		ContactInformation,
	} from '$lib/components/contact';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Contact us - TechExpress</title>
</svelte:head>

<Contact>
	<div class="grid h-full w-full items-stretch gap-14 sm:grid-cols-2">
		<ContactForm form={data.contactForm} />
		<ContactInformation />
	</div>
</Contact>
