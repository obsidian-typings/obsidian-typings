export {};

declare module 'obsidian' {
  /**
   * A confirmation button used in a {@link ConfirmationModal}.
   *
   * @since 1.13.0
   */
  interface ConfirmationButton extends ButtonComponent {
    /**
     * Sets the click event callback for the confirmation button. The modal
     * is auto-closed after the click unless the handler returns a truthy
     * value (or a promise that resolves to one).
     *
     * @param handler - The callback to invoke when the button is clicked.
     * @returns The confirmation button.
     * @official
     * @since 1.13.0
     */
    onClick(handler: (evt: MouseEvent) => Promise<unknown> | unknown): this;

    /**
     * Style the button as the dismissal action.
     *
     * @returns The confirmation button.
     * @official
     * @since 1.13.0
     */
    setCancel(): this;

    /**
     * Mark this button as the focus target when the modal opens. If multiple
     * buttons in the same modal have this set, the last-marked one wins.
     *
     * @returns The confirmation button.
     * @official
     * @since 1.13.0
     */
    setInitialFocus(): this;

    /**
     * Place the button separately from the main button group (e.g. for a
     * tertiary action that shouldn't sit next to the primary/cancel pair).
     *
     * @returns The confirmation button.
     * @official
     * @since 1.13.0
     */
    setSecondary(): this;
  }
}
