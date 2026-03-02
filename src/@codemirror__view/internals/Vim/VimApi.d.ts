import type { VimEditor } from './VimEditor.d.ts';
import type { VimState } from './VimState.d.ts';

/**
 * Public API for interacting with the Vim emulation layer.
 * @public
 * @unofficial
 */
export interface VimApi {
    /** Whether to suppress error logging from the Vim layer. */
    suppressErrorLogging: boolean;

    /** Register an internal key mapping command. */
    _mapCommand(command: unknown): unknown;

    /** Build the key map from the current configuration. */
    buildKeyMap(): void;

    /** Define a new Vim action with the given name and handler function. */
    defineAction(name: string, fn: (cm: VimEditor, actionArgs: unknown, vim: VimState['vim']) => void): void;

    /** Define a new Ex command with the given name and prefix. */
    defineEx(name: unknown, prefix: unknown, func: unknown): unknown;

    /** Define a new Vim motion with the given name and handler. */
    defineMotion(name: unknown, fn: unknown): unknown;

    /** Define a new Vim operator with the given name and handler. */
    defineOperator(name: unknown, fn: unknown): unknown;

    /** Define a new Vim option with default value, type, aliases, and change callback. */
    defineOption(name: unknown, defaultValue: unknown, type: unknown, aliases: unknown, callback: unknown): unknown;

    /** Define a new named register. */
    defineRegister(name: unknown, register: unknown): unknown;

    /** Enter insert mode in the given editor. */
    enterInsertMode(cm: unknown): unknown;

    /** Enter Vim mode in the given editor. */
    enterVimMode(cm: unknown): unknown;

    /** Exit insert mode, optionally keeping the cursor position. */
    exitInsertMode(cm: unknown, keepCursor: unknown): unknown;

    /** Exit visual mode, optionally moving the head of the selection. */
    exitVisualMode(cm: unknown, moveHead: unknown): unknown;

    /** Look up a key binding in the given editor and origin context. */
    findKey(cm: unknown, key: unknown, origin: unknown): unknown;

    /** Get the value of a Vim option. */
    getOption(name: unknown, cm: unknown, cfg: unknown): unknown;

    /** Get the register controller managing all registers. */
    getRegisterController(): unknown;

    /** Get the global Vim state object. */
    getVimGlobalState_(): unknown;

    /** Handle an Ex command input string. */
    handleEx(cm: unknown, input: unknown): unknown;

    /** Handle a key press in the given editor with the specified origin. */
    handleKey(cm: unknown, key: unknown, origin: unknown): unknown;

    /** Create an insert mode key binding for the given key name. */
    InsertModeKey(keyName: string): void;

    /** Leave Vim mode in the given editor. */
    leaveVimMode(cm: unknown): unknown;

    /** Create a recursive key mapping from lhs to rhs in the given context. */
    map(lhs: unknown, rhs: unknown, ctx: unknown): unknown;

    /** Clear all key mappings in the given context. */
    mapclear(ctx: unknown): unknown;

    /** Map a key sequence to a command type, name, args, and extra options. */
    mapCommand(keys: unknown, type: unknown, name: unknown, args: unknown, extra: unknown): unknown;

    /** Initialize the Vim state for the given editor if not already initialized. */
    maybeInitVimState_(cm: unknown): unknown;

    /** Handle a key press in multi-select mode. */
    multiSelectHandleKey(cm: unknown, key: unknown, origin: unknown): unknown;

    /** Create a non-recursive key mapping from lhs to rhs in the given context. */
    noremap(lhs: unknown, rhs: unknown, ctx: unknown): unknown;

    /** Reset the global Vim state to defaults. */
    resetVimGlobalState_(): unknown;

    /** Set the value of a Vim option. */
    setOption(name: unknown, value: unknown, cm: unknown, cfg: unknown): unknown;

    /** Remove a key mapping for lhs in the given context. */
    unmap(lhs: unknown, ctx: unknown): unknown;
}
