<script lang="ts">
	import {
		Contact,
		ContactForm,
		ContactInformation,
	} from '$lib/components/contact';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<Contact>
	<div class="grid h-full w-full items-stretch gap-14 sm:grid-cols-2">
		<ContactForm form={data.contactForm} />
		<ContactInformation />
	</div>
</Contact>
