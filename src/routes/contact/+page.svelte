<script lang="ts">
	import {
		Contact,
		ContactForm,
		ContactInformation,
	} from '$lib/components/contact';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
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
