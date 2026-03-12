import type { getToggleComponentConstructor } from '../../implementations/constructors/augmentations/components/getToggleComponentConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * A toggle component.
   * @since 0.9.7
   */
  interface ToggleComponent extends ValueComponent<boolean> {
    /**
     * The HTML element that represents the toggle.
     *
     * @official
     * @since 0.9.7
     */
    toggleEl: HTMLElement;

    /**
     * The function that's called after changing the value of the component.
     *
     * @remark Using `ToggleComponent.onChange(callback)` assigns the callback to this method.
     * @unofficial
     */
    changeCallback?(value: boolean): void;

    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getToggleComponentConstructor} from `obsidian-typings/implementations`.
     *
     * @param containerEl - The container element.
     * @returns The toggle component instance.
     * @official
     * @since 0.9.7
     * @deprecated - Added only for typing purposes.
     */
    constructor3__(containerEl: HTMLElement): this;

    /**
     * Get the value of the toggle.
     *
     * @returns The value of the toggle.
     * @official
     * @since 0.9.7
     */
    getValue(): boolean;

    /**
     * Handle the change event of the toggle.
     *
     * @param callback - The callback to handle the change event.
     * @returns The toggle.
     * @example
     * ```ts
     * toggle.onChange((value) => {
     *     console.log(value);
     * });
     * ```
     * @official
     * @since 0.9.7
     */
    onChange(callback: (value: boolean) => unknown): this;

    /**
     * Handle the click event of the toggle.
     *
     * @official
     * @since 0.9.7
     */
    onClick(): void;

    /**
     * Disable the toggle.
     *
     * @param disabled - Whether to disable the toggle.
     * @returns The toggle.
     * @example
     * ```ts
     * toggle.setDisabled(true);
     * ```
     * @official
     * @since 1.2.3
     */
    setDisabled(disabled: boolean): this;

    /**
     * Set the tooltip of the toggle.
     *
     * @param tooltip - The tooltip text to show.
     * @param options - The options for the tooltip.
     * @returns The toggle.
     * @official
     * @since 1.1.1
     */
    setTooltip(tooltip: string, options?: TooltipOptions): this;

    /**
     * Set the value of the toggle.
     *
     * @param on - Whether the toggle is on.
     * @returns The toggle.
     * @example
     * ```ts
     * toggle.setValue(true);
     * ```
     * @official
     * @since 0.9.7
     */
    setValue(on: boolean): this;
  }
}
