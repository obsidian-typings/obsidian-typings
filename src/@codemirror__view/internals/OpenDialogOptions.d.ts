/**
 * @public
 */
export interface OpenDialogOptions {
    bottom: number;
    onClose(div: HTMLDivElement): void;
    value: string;
    selectValueOnOpen: boolean;
    onInput(e: KeyboardEvent, value: string, callback: (value: unknown) => void): void;
    onKeyUp(e: KeyboardEvent, value: string, callback: (value: unknown) => void): void;
    onKeyDown(e: KeyboardEvent, value: string, callback: (value: unknown) => void): void;
    closeOnEnter: boolean;
    closeOnBlur: boolean;
}
