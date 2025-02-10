<script lang="ts">
	import { FooterList, FooterSocialMediaList } from '$lib/components/layout/ui';
</script>

<footer class="w-full border-t">
	<div class="container pt-12">
		<nav class="grid gap-4 sm:grid-cols-3 sm:justify-items-center">
			<FooterList
				header="TechExpress"
				links={[
					{ href: '/about', link: 'About' },
					{ href: '/contact', link: 'Contact' },
				]}
			/>
			<FooterList
				header="Information"
				links={[
					{ href: '/integrity-policy', link: 'Integrity Policy' },
					{ href: '/cookie-policy', link: 'Cookie Policy' },
				]}
			/>
			<FooterSocialMediaList />
		</nav>
	</div>
	<div class="mt-12 border-t py-7">
		<p class="text-center text-xs font-medium">
			&copy; 2025 TechExpress. All rights reserved.
		</p>
	</div>
</footer>
