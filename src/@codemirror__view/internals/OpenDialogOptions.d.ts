/**
 * Options for opening an interactive dialog in the editor (e.g., Vim command line).
 * @public
 * @unofficial
 */
export interface OpenDialogOptions {
    /** Whether to display the dialog at the bottom of the editor. */
    bottom: number;

    /** Whether to close the dialog when it loses focus. */
    closeOnBlur: boolean;

    /** Whether to close the dialog when the Enter key is pressed. */
    closeOnEnter: boolean;

    /**
     * Callback invoked when the dialog is closed.
     *
     * @param div - The dialog container element.
     */
    onClose(div: HTMLDivElement): void;

    /**
     * Callback invoked when the dialog input value changes.
     *
     * @param e - The keyboard event.
     * @param value - The current input value.
     * @param callback - The callback to invoke with the result.
     */
    onInput(e: KeyboardEvent, value: string, callback: (value: unknown) => void): void;

    /**
     * Callback invoked when a key is pressed down in the dialog.
     *
     * @param e - The keyboard event.
     * @param value - The current input value.
     * @param callback - The callback to invoke with the result.
     */
    onKeyDown(e: KeyboardEvent, value: string, callback: (value: unknown) => void): void;

    /**
     * Callback invoked when a key is released in the dialog.
     *
     * @param e - The keyboard event.
     * @param value - The current input value.
     * @param callback - The callback to invoke with the result.
     */
    onKeyUp(e: KeyboardEvent, value: string, callback: (value: unknown) => void): void;

    /** Whether to select the input value when the dialog opens. */
    selectValueOnOpen: boolean;

    /** Initial value for the dialog input. */
    value: string;
}
