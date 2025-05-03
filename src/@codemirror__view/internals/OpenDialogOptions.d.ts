/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface OpenDialogOptions {
    /** @todo Documentation incomplete. */
    bottom: number;

    /** @todo Documentation incomplete. */
    closeOnBlur: boolean;

    /** @todo Documentation incomplete. */
    closeOnEnter: boolean;

    /** @todo Documentation incomplete. */
    selectValueOnOpen: boolean;

    /** @todo Documentation incomplete. */
    value: string;

    /** @todo Documentation incomplete. */
    onClose(div: HTMLDivElement): void;

    /** @todo Documentation incomplete. */
    onInput(e: KeyboardEvent, value: string, callback: (value: unknown) => void): void;

    /** @todo Documentation incomplete. */
    onKeyDown(e: KeyboardEvent, value: string, callback: (value: unknown) => void): void;

    /** @todo Documentation incomplete. */
    onKeyUp(e: KeyboardEvent, value: string, callback: (value: unknown) => void): void;
}
