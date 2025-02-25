<script lang="ts">
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle,
	} from '$lib/components/ui/card';
	import { Link } from '$lib/components/ui/link';
	import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-svelte';
</script>

<Card class="h-full flex-1">
	<CardHeader>
		<CardTitle class="text-xl">Company Information</CardTitle>
	</CardHeader>
	<CardContent class="grid gap-6">
		<div class="flex items-start gap-4">
			<MapPinIcon class="mt-1 scale-100" />
			<div>
				<h3 class="font-semibold">Headquarters Address</h3>
				<p class="text-sm whitespace-pre-line">
					{`Vasagatan 17c\n123 45, Stockholm\nSweden`}
				</p>
			</div>
		</div>
		<div class="flex items-start gap-4">
			<MailIcon class="mt-1 scale-95" />
			<div>
				<h3 class="font-semibold">Email</h3>
				<Link
					href="mailto:support@techexpress.se"
					class="text-foreground/75 hover:text-primary dark:text-muted-foreground text-sm"
				>
					support@techexpress.se
				</Link>
			</div>
		</div>
		<div class="flex items-start gap-4">
			<PhoneIcon class="mt-1 scale-95" />
			<div>
				<h3 class="font-semibold">Phone Number</h3>
				<Link
					href="tel:+4681234567"
					class="text-foreground/75 hover:text-primary dark:text-muted-foreground text-sm"
				>
					08-123 45 67
				</Link>
			</div>
		</div>
		<div class="flex items-start gap-4">
			<ClockIcon class="mt-1 scale-95" />
			<div>
				<h3 class="font-semibold">Opening Hours</h3>
				<p class="text-sm whitespace-pre-line">
					{`Monday - Friday: 9:00 - 18:00\nSaturday: 10:00 - 15:00\nSunday: Closed`}
				</p>
			</div>
		</div>
	</CardContent>
</Card>
