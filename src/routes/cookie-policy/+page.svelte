<script lang="ts">
	import { PUBLIC_COOKIE_POLICY_LAST_UPDATED } from '$env/static/public';
	import { MarkdownCard } from '$lib/components/markdown';
	import { CookieIcon } from '$lib/components/ui/icons';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<MarkdownCard
	data={data.cookiePolicy}
	title="Cookie Policy"
	subTitle={`Last updated: ${PUBLIC_COOKIE_POLICY_LAST_UPDATED}`}
	icon={CookieIcon}
/>
