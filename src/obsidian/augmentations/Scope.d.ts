import type { KeyScope } from '../internals/KeyScope.d.ts';

export {};

declare module 'obsidian' {
    /**
     * A scope receives keyboard events and binds callbacks to given hotkeys.
     * Only one scope is active at a time, but scopes may define parent scopes (in the constructor) and inherit their hotkeys.
     */
    interface Scope {
        /**
         * Callback to execute when scope is matched
         *
         * @unofficial
         */
        cb: (() => boolean) | undefined;

        /**
         * Overridden keys that exist in this scope.
         *
         * @unofficial
         */
        keys: KeyScope[];

        /**
         * Scope that this scope is a child of
         *
         * @unofficial
         */
        parent: Scope | undefined;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        tabFocusContainerEl: HTMLElement | null;

        /**
         * Create a new scope.
         *
         * @param parent - The parent scope.
         * @official
         * @deprecated - Added only for typing purposes. Use {@link constructor} instead.
         */
        constructor__(parent?: Scope): this;

        /**
         * Execute keypress within this scope.
         *
         * @param event - Keyboard event.
         * @param keypress - Pressed key information.
         * @unofficial
         */
        handleKey(event: KeyboardEvent, keypress: KeymapInfo): unknown;

        /**
         * Add a keymap event handler to this scope.
         *
         * @param modifiers - `Mod`, `Ctrl`, `Meta`, `Shift`, or `Alt`. `Mod` translates to `Meta` on macOS and `Ctrl` otherwise. Pass `null` to capture all events matching the `key`, regardless of modifiers.
         * @param key - Keycode from https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key%5FValues.
         * @param func - the callback that will be called when a user triggers the keybind.
         * @returns The keymap event handler.
         * @example
         * ```ts
         * scope.register(['Ctrl', 'Shift'], 'l', (evt, ctx) => {
         *     console.log('Ctrl+Shift+L pressed');
         * });
         * ```
         * @official
         */
        register(modifiers: Modifier[] | null, key: string | null, func: KeymapEventListener): KeymapEventHandler;

        /**
         * @todo Documentation incomplete.
         * @unofficial
         */
        setTabFocusContainer(container: HTMLElement): void;

        /**
         * Remove an existing keymap event handler.
         *
         * @param handler - The keymap event handler to remove.
         * @example
         * ```ts
         * scope.unregister(handler);
         * ```
         * @official
         */
        unregister(handler: KeymapEventHandler): void;
    }
}
