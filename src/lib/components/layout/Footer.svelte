<script lang="ts">
	import { FooterList, FooterSocialMediaList } from '$lib/components/layout/ui';
</script>

<footer class="w-full border-t">
	<div class="container pt-12">
		<nav
			class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:justify-items-center"
		>
			<FooterList
				header="Om TeknikExpressen"
				links={[{ href: '/om-oss', link: 'Om oss' }]}
			/>
			<FooterList
				header="Kundservice"
				links={[
					{ href: '/kontakt', link: 'Kontakta oss' },
					{ href: '/leverans', link: 'Leverans' },
					{ href: '/retur', link: 'Returer' },
				]}
			/>
			<FooterList
				header="Information"
				links={[
					{ href: '/policys/integritet', link: 'Integritetspolicy' },
					{ href: '/policys/cookies', link: 'Cookiepolicy' },
				]}
			/>
			<FooterSocialMediaList />
		</nav>
	</div>
	<div class="mt-12 border-t py-8 text-center text-muted-foreground">
		<p>&copy; 2025 TeknikExpressen. Alla rättigheter förbehållna.</p>
	</div>
</footer>
