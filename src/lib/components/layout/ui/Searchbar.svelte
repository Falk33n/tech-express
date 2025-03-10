<script lang="ts">
	import { SearchbarProduct } from '$lib/components/layout/ui';
	import {
		Command,
		CommandEmpty,
		CommandGroup,
		CommandInput,
		CommandItem,
		CommandList,
	} from '$lib/components/ui/command';
	import type { GlobalLayoutProps } from '$lib/types';
	import { getContext, onMount } from 'svelte';

	let inputValue = $state('');
	let listWidth = $state(0);
	let hasFocus = $state(false);

	type Props = {
		rootRef?: HTMLDivElement | null;
		inputRef?: HTMLInputElement | null;
	};

	let { products }: GlobalLayoutProps = getContext('global-layout');

	let { rootRef = $bindable(null), inputRef = $bindable(null) }: Props =
		$props();

	const productsToShow = products.filter((product) =>
		product.name.toLowerCase().includes(inputValue.toLowerCase()),
	);

	function getCommandInputWidth() {
		if (!rootRef) return;

		const refStyles = window.getComputedStyle(rootRef);
		const refWidth = parseFloat(refStyles.width);

		listWidth = refWidth;
	}

	type MouseEventProps = MouseEvent & {
		currentTarget: EventTarget & HTMLDivElement;
	};

	function handleCommandBlur(event: MouseEventProps) {
		if (!rootRef || !inputRef) return;
		if (!rootRef.contains(event.relatedTarget as Node)) {
			hasFocus = false;
			inputValue = '';
			inputRef.blur();
		}
	}

	onMount(() => {
		getCommandInputWidth();
		window.addEventListener('resize', getCommandInputWidth);

		return () => {
			window.removeEventListener('resize', getCommandInputWidth);
		};
	});
</script>

<Command
	bind:ref={rootRef}
	class="border focus-within:border-primary rounded-lg max-w-[450px]"
	onmouseleave={(event) => handleCommandBlur(event)}
>
	<label
		for="searchbar"
		class="sr-only"
	>
		Searchbar
	</label>
	<CommandInput
		bind:ref={inputRef}
		bind:value={inputValue}
		id="searchbar"
		placeholder="Search..."
		class="h-9 text-sm"
		onfocus={() => (hasFocus = true)}
	/>
	{#if !!inputValue && hasFocus}
		<div class="top-0 z-[100] fixed -ml-8 px-8 pt-[17.5rem] lg:pt-16 pb-8">
			<CommandList
				class="bg-popover border rounded-b-lg max-lg:max-h-[550px]"
				style={`width: ${listWidth}px;`}
			>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading="Search Results:">
					{#each productsToShow as { id, name, price, quantity, imageUrl, imageDescription }}
						<CommandItem class="my-2">
							<SearchbarProduct
								{id}
								{name}
								{price}
								{quantity}
								{imageUrl}
								{imageDescription}
							/>
						</CommandItem>
					{/each}
				</CommandGroup>
			</CommandList>
		</div>
	{/if}
</Command>
