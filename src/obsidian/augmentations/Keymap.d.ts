export {};

declare module 'obsidian' {
    /**
     * Manages keymap lifecycle for different {@link Scope}s.
     * @since 0.13.9
     */
    interface Keymap {
        /**
         * Remove a scope from the scope stack.
         * If the given scope is active, the next scope in the stack will be made active.
         *
         * @param scope - The scope to pop.
         * @example
         * ```ts
         * keymap.popScope(new Scope());
         * @official
         * @since 0.13.9
         */
        popScope(scope: Scope): void;

        /**
         * Push a scope onto the scope stack, setting it as the active scope to handle all key events.
         *
         * @param scope - The scope to push.
         * @example
         * ```ts
         * keymap.pushScope(new Scope());
         * ```
         * @official
         * @since 0.13.9
         */
        pushScope(scope: Scope): void;
    }

    namespace Keymap {
        /**
         * Translates an event into the type of pane that should open.
         *
         * @param evt - The event to check.
         * @returns The type of pane that should open.
         * - Returns `false` if `evt` is `null`, `undefined` or none of the modifier keys are pressed.
         * - Returns `'tab'` if the modifier key Cmd/Ctrl is pressed OR if `evt` is a middle-click {@link MouseEvent}.
         * - Returns `'split'` if Cmd/Ctrl+Alt is pressed.
         * - Returns `'window'` if Cmd/Ctrl+Alt+Shift is pressed.
         *
         * @example
         * ```ts
         * console.log(Keymap.isModEvent(evt));
         * ```
         *
         * @official
         * @deprecated - Added only for typing purposes. Use {@link isModEvent} instead.
         * @since 0.16.0
         */
        function isModEvent__(evt?: UserEvent | null): PaneType | boolean;

        /**
         * Checks whether the modifier key is pressed during this event.
         *
         * @param evt - The event to check.
         * @param modifier - The modifier to check.
         * @returns `true` if the modifier key is pressed, `false` otherwise.
         *
         * @example
         * ```ts
         * if (Keymap.isModifier(evt, 'Ctrl')) {
         *     console.log('Ctrl is pressed');
         * }
         * ```
         *
         * @official
         * @deprecated - Added only for typing purposes. Use {@link isModifier} instead.
         * @since 0.12.17
         */
        function isModifier__(evt: MouseEvent | TouchEvent | KeyboardEvent, modifier: Modifier): boolean;
    }
}
