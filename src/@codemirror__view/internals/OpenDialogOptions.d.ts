/** @public @unofficial */
export interface OpenDialogOptions {
    bottom: number;
    closeOnBlur: boolean;
    closeOnEnter: boolean;
    selectValueOnOpen: boolean;
    value: string;

    onClose(div: HTMLDivElement): void;
    onInput(e: KeyboardEvent, value: string, callback: (value: unknown) => void): void;
    onKeyDown(e: KeyboardEvent, value: string, callback: (value: unknown) => void): void;
    onKeyUp(e: KeyboardEvent, value: string, callback: (value: unknown) => void): void;
}
