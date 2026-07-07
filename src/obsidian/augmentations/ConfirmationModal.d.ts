import type { getConfirmationModalConstructor } from '../implementations/constructors/augmentations/getConfirmationModalConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * A modal with a configurable button row used to confirm a destructive or
   * otherwise irreversible action.
   *
   * @since 1.13.0
   */
  interface ConfirmationModal extends Modal {
    /**
     * Container for the modal's button row.
     *
     * @official
     * @since 1.13.0
     */
    buttonContainerEl: HTMLElement;

    /**
     * The buttons in the modal's button row.
     *
     * @unofficial
     */
    buttons: ConfirmationButton[];

    /**
     * Add a button to the modal's button row.
     *
     * @param cb - The callback that configures the button.
     * @returns The confirmation modal.
     * @official
     * @since 1.13.0
     */
    addButton(cb: (btn: ConfirmationButton) => unknown): this;

    /**
     * Add a cancel button to the modal's button row.
     *
     * @param text - Optional label for the cancel button.
     * @returns The confirmation modal.
     * @official
     * @since 1.13.0
     */
    addCancelButton(text?: string): this;

    /**
     * Add a checkbox below the message.
     *
     * @param label - The checkbox label.
     * @param cb - The callback invoked when the checkbox value changes.
     * @returns The confirmation modal.
     * @official
     * @since 1.13.0
     */
    addCheckbox(label: string, cb: (value: boolean) => Promise<unknown> | unknown): this;

    /**
     * Add a CSS class to the modal element.
     *
     * @param cls - The CSS class to add.
     * @returns The confirmation modal.
     * @official
     * @since 1.13.0
     */
    addClass(cls: string): this;

    /**
     * Creates a new instance of {@link ConfirmationModal}.
     *
     * To get the constructor instance, use {@link getConfirmationModalConstructor} from `obsidian-typings/implementations`.
     *
     * @param app - The Obsidian app instance.
     * @returns The new instance.
     * @official
     * @since 1.13.0
     * @deprecated - Added only for typing purposes.
     */
    constructor__?(app: App): this;
  }
}
