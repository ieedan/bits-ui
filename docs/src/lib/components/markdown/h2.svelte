<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils/styles.js";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLHeadingElement> = $props();
</script>

<h2
	class={cn(
		"mt-12 scroll-m-[70px] text-[27px] font-semibold tracking-[-0.01em] first:mt-0",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</h2>
