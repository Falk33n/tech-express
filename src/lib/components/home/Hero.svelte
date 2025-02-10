<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<div
	class="bg-muted hero-background flex min-h-[calc(100vh-4rem)] w-full flex-col justify-center py-20"
>
	<div class="container grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
		<section class="space-y-6">
			<h1
				class="w-fit text-3xl font-bold tracking-tighter backdrop-blur-xs sm:text-4xl xl:text-5xl"
			>
				Discover the futures technology
			</h1>
			<p class="w-fit backdrop-blur-xs">
				Find the best goods for the best price. Express delivery and free
				shipping over $79.99!
			</p>
			<div class="flex flex-wrap gap-4">
				<Button
					href="#popular-products"
					size="lg"
					class="w-[200px]">Shop now</Button
				>
				<Button
					href="#categories"
					variant="outline"
					size="lg"
					class="hover:bg-background/60 w-[200px] backdrop-blur-xs"
				>
					Browse new goods
				</Button>
			</div>
		</section>
		<figure class="max-lg:mt-12">
			<img
				src="/images/hero.webp"
				alt="A computer with its own parts flying out of the case"
				class="rounded-lg object-cover"
				draggable={false}
				loading="eager"
				width={800}
				height={600}
			/>
		</figure>
	</div>
</div>
