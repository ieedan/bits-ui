import type { Snippet } from "svelte";
import type {
	EventCallback,
	OnChangeFn,
	PrimitiveButtonAttributes,
	PrimitiveDivAttributes,
	WithAsChild,
} from "$lib/internal/index.js";
import type { Orientation } from "$lib/index.js";

export type RadioGroupRootPropsWithoutHTML = WithAsChild<{
	/**
	 * The orientation of the radio group. Used to determine
	 * how keyboard navigation should work.
	 *
	 * @defaultValue "vertical"
	 */
	orientation?: Orientation;

	/**
	 * Whether to loop around the radio items when navigating
	 * with the keyboard.
	 *
	 * @defaultValue true
	 */
	loop?: boolean;

	/**
	 * The value of the selected radio item.
	 *
	 * @defaultValue ""
	 */
	value?: string;

	/**
	 * The callback to call when the selected radio item changes.
	 */
	onValueChange?: OnChangeFn<string>;

	/**
	 * The name to apply to the radio group's input element for
	 * form submission. If not provided, a hidden input will not
	 * be rendered and the radio group will not be part of a form.
	 *
	 * @defaultValue undefined
	 */
	name?: string;

	/**
	 * Whether the radio group is disabled.
	 *
	 * @defaultValue false
	 */
	disabled?: boolean;

	/**
	 * Whether the radio group is required for form submission.
	 * If `true`, ensure you provide a `name` prop so the hidden
	 * input is rendered.
	 */
	required?: boolean;
}>;

export type RadioGroupRootProps = RadioGroupRootPropsWithoutHTML & PrimitiveDivAttributes;

export type RadioGroupItemPropsWithoutHTML = WithAsChild<{
	/**
	 * The value of the radio item.
	 */
	value: string;

	/**
	 * Whether the radio item is disabled.
	 *
	 * @defaultValue false
	 */
	disabled?: boolean;

	onclick?: EventCallback<MouseEvent>;

	onkeydown?: EventCallback<KeyboardEvent>;

	/**
	 * A snippet to render the radio item's indicator.
	 * It receives the item's `checked` state as a prop
	 * for conditional styling.
	 */
	indicator?: Snippet<[{ checked: boolean }]>;
}>;

export type RadioGroupItemProps = RadioGroupItemPropsWithoutHTML &
	Omit<PrimitiveButtonAttributes, "value" | "disabled" | "onclick" | "onkeydown">;
