<script lang="ts">
	import { Checkbox } from "bits-ui";

	let {
		value: valueProp = $bindable([]),
		items = [],
		disabledItems = [],
		onFormSubmit,
		getValue: getValueProp,
		setValue: setValueProp,
		...restProps
	}: Checkbox.GroupProps & {
		/**
		 * The individual checkbox items.
		 */
		items?: string[];
		disabledItems?: string[];
		onFormSubmit?: (fd: FormData) => void;
		setValue?: (value: string[]) => void;
		getValue?: () => string[];
	} = $props();

	let myValue = $state(valueProp);
</script>

{#snippet MyCheckbox({ itemValue }: { itemValue: string })}
	<Checkbox.Root
		data-testid="{itemValue}-checkbox"
		value={itemValue}
		disabled={disabledItems?.includes(itemValue)}
	>
		{#snippet children({ checked, indeterminate })}
			<span data-testid="{itemValue}-indicator">
				{#if indeterminate}
					indeterminate
				{:else}
					{checked}
				{/if}
			</span>
		{/snippet}
	</Checkbox.Root>
{/snippet}

<main>
	<form
		method="POST"
		onsubmit={(e) => {
			e.preventDefault();
			const formData = new FormData(e.currentTarget);
			onFormSubmit?.(formData);
		}}
	>
		<p data-testid="binding">{myValue}</p>
		<Checkbox.Group
			data-testid="group"
			bind:value={
				() => {
					getValueProp?.();
					return myValue;
				},
				(v) => {
					setValueProp?.(v);
					myValue = v;
				}
			}
			{...restProps}
		>
			<Checkbox.GroupLabel data-testid="group-label">My Group</Checkbox.GroupLabel>
			{#each items as itemValue (itemValue)}
				{@render MyCheckbox({ itemValue })}
			{/each}
		</Checkbox.Group>
		<button type="submit" data-testid="submit"> Submit </button>
	</form>
	<button data-testid="update" onclick={() => (myValue = ["c", "d"])}>
		Programmatic update
	</button>
</main>
