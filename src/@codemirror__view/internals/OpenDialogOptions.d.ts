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

    /** Whether to select the input value when the dialog opens. */
    selectValueOnOpen: boolean;

    /** Initial value for the dialog input. */
    value: string;

    /** Callback invoked when the dialog is closed. */
    onClose(div: HTMLDivElement): void;

    /** Callback invoked when the dialog input value changes. */
    onInput(e: KeyboardEvent, value: string, callback: (value: unknown) => void): void;

    /** Callback invoked when a key is pressed down in the dialog. */
    onKeyDown(e: KeyboardEvent, value: string, callback: (value: unknown) => void): void;

    /** Callback invoked when a key is released in the dialog. */
    onKeyUp(e: KeyboardEvent, value: string, callback: (value: unknown) => void): void;
}
