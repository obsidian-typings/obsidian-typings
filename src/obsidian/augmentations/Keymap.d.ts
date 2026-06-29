import type { getKeymapConstructor } from '../implementations/constructors/augmentations/getKeymapConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * Manages keymap lifecycle for different {@link obsidian#Scope}s.
   *
   * @since 0.13.9
   */
  interface Keymap {
    /**
     * The compiled, sorted, comma-joined string of currently-pressed modifiers (e.g. `'Ctrl,Shift'`).
     *
     * @unofficial
     */
    modifiers: string;

    /**
     * The root scope, active when no other scope is pushed.
     *
     * @unofficial
     */
    rootScope: Scope;

    /**
     * Per-window scope stacks, keyed by the window the events originate from.
     *
     * @unofficial
     */
    windowScopes: WeakMap<Window, KeymapWindowStack>;

    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getKeymapConstructor} from `obsidian-typings/implementations`.
     *
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor__(): this;

    /**
     * Gets the root scope.
     *
     * @returns The root scope.
     * @unofficial
     */
    getRootScope(): Scope;

    /**
     * Gets the scope stack for a window, creating it lazily if absent.
     *
     * @param win - The window whose scope stack to get.
     * @returns The window's scope stack.
     * @unofficial
     */
    getWindowStack(win: Window): KeymapWindowStack;

    /**
     * Checks whether a modifier is currently pressed.
     *
     * @param modifier - The modifier to check.
     * @returns Whether the modifier is currently pressed.
     * @unofficial
     */
    hasModifier(modifier: Modifier): boolean;

    /**
     * Checks whether the currently-pressed modifiers exactly match the given compiled modifier string.
     *
     * @param modifiers - The compiled, sorted, comma-joined modifier string to compare against.
     * @returns Whether the modifiers match.
     * @unofficial
     */
    matchModifiers(modifiers: string): boolean;

    /**
     * Handles a focus-in event for the keymap's tab-focus handling.
     *
     * @param evt - The focus event.
     * @unofficial
     */
    onFocusIn(evt: FocusEvent): void;

    /**
     * Handles a key event, dispatching it to the active scope.
     *
     * @param evt - The keyboard event.
     * @returns `false` when the event was handled and should be swallowed, otherwise `undefined`.
     * @unofficial
     */
    onKeyEvent(evt: KeyboardEvent): false | void;

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

    /**
     * Registers keyboard and focus event listeners on a window.
     *
     * @param win - The window to register on.
     * @returns A function that unregisters the listeners.
     * @unofficial
     */
    registerWindow(win: Window): () => void;

    /**
     * Sets the base scope for a window's scope stack.
     *
     * @param win - The window whose base scope to set.
     * @param scope - The scope to set as the window's base.
     * @unofficial
     */
    setWindowBaseScope(win: Window, scope: Scope): void;

    /**
     * Updates the currently-pressed modifiers from a keyboard event.
     *
     * @param evt - The keyboard event to read modifiers from.
     * @unofficial
     */
    updateModifiers(evt: KeyboardEvent): void;
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
    function isModEvent__(evt?: null | UserEvent): boolean | PaneType;

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
    function isModifier__(evt: KeyboardEvent | MouseEvent | TouchEvent, modifier: Modifier): boolean;
  }
}
