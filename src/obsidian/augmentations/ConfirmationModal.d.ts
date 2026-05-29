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
     * Add a button to the modal's button row.
     *
     * @param cb - The callback that configures the button.
     * @returns The confirmation modal.
     * @official
     * @since 1.13.0
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Required by official API for declaration merging.
    addButton(cb: (btn: ConfirmationButton) => any): this;

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Required by official API for declaration merging.
    addCheckbox(label: string, cb: (value: boolean) => any | Promise<any>): this;

    /**
     * Add a CSS class to the modal element.
     *
     * @param cls - The CSS class to add.
     * @returns The confirmation modal.
     * @official
     * @since 1.13.0
     */
    addClass(cls: string): this;
  }
}
