<script lang="ts">
	import { ScrollArea, type WithoutChild } from "bits-ui";
	import DemoContainer from "../demo-container.svelte";
	import { cn } from "$lib/utils/styles.js";

	type Props = WithoutChild<ScrollArea.RootProps> & {
		orientation: "vertical" | "horizontal" | "both";
		viewportClasses?: string;
	};

	let {
		ref = $bindable(null),
		orientation = "vertical",
		viewportClasses,
		children,
		...restProps
	}: Props = $props();
</script>

{#snippet Scrollbar({ orientation }: { orientation: "vertical" | "horizontal" })}
	{#if orientation === "vertical"}
		<ScrollArea.Scrollbar
			{orientation}
			class="bg-muted hover:bg-dark-10 data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out-0 data-[state=visible]:fade-in-0 flex w-2.5 touch-none select-none rounded-full border-l border-l-transparent p-px transition-all duration-200 hover:w-3"
		>
			<ScrollArea.Thumb class="bg-muted-foreground flex-1 rounded-full" />
		</ScrollArea.Scrollbar>
	{:else}
		<ScrollArea.Scrollbar
			{orientation}
			class="bg-muted hover:bg-dark-10 data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out-0 data-[state=visible]:fade-in-0 flex h-2.5 touch-none select-none rounded-full border-t border-t-transparent p-px transition-all duration-200 hover:h-3"
		>
			<ScrollArea.Thumb class="d bg-muted-foreground rounded-full" />
		</ScrollArea.Scrollbar>
	{/if}
{/snippet}

<DemoContainer size="sm">
	<ScrollArea.Root
		bind:ref
		{...restProps}
		class="border-dark-10 bg-background-alt shadow-card relative overflow-hidden rounded-[10px] border px-4 py-4"
	>
		<ScrollArea.Viewport
			class={cn("h-full max-h-[200px] w-full max-w-[200px]", viewportClasses)}
		>
			{#if children}
				{@render children?.()}
			{:else}
				<h4
					class="text-foreground mb-4 mt-2 text-xl font-semibold leading-none tracking-[-0.01em]"
				>
					Scroll Area
				</h4>
				<p class="text-foreground-alt text-wrap text-sm leading-5">
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos impedit
					rem, repellat deserunt ducimus quasi nisi voluptatem cumque aliquid esse ea
					deleniti eveniet incidunt! Deserunt minus laborum accusamus iusto dolorum. Lorem
					ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis officiis error
					minima eos fugit voluptate excepturi eveniet dolore et, ratione impedit
					consequuntur dolorem hic quae corrupti autem? Dolorem, sit voluptatum.
				</p>
			{/if}
		</ScrollArea.Viewport>
		{#if orientation === "vertical" || orientation === "both"}
			{@render Scrollbar({ orientation: "vertical" })}
		{/if}
		{#if orientation === "horizontal" || orientation === "both"}
			{@render Scrollbar({ orientation: "horizontal" })}
		{/if}
		<ScrollArea.Corner />
	</ScrollArea.Root>
</DemoContainer>
