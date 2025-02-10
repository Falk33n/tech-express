<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle,
	} from '$lib/components/ui/card';
	import { CookieIcon, ShieldIcon } from '$lib/components/ui/icons';
	import MarkdownIt from 'markdown-it';

	type Props = {
		data: string;
		title: string;
		subTitle: string;
		icon?: typeof CookieIcon | typeof ShieldIcon;
	};

	let { data, title, subTitle, icon: Icon }: Props = $props();

	const markdown = new MarkdownIt();
	const isMarkdownEmpty = data === '';
</script>

<div class="container py-20">
	<Card class="w-full md:mx-auto md:max-w-6xl">
		<CardHeader>
			<div class="flex items-center gap-2">
				{#if Icon}
					<Icon class="scale-110" />
				{/if}
				<CardTitle class="mb-1 text-2xl font-semibold">
					{title}
				</CardTitle>
			</div>
			<CardDescription>
				{subTitle}
			</CardDescription>
		</CardHeader>
		<CardContent class="space-y-8">
			{#if !isMarkdownEmpty}
				<div class="markdown-container">
					{@html markdown.render(data)}
				</div>
			{/if}
		</CardContent>
	</Card>
</div>
