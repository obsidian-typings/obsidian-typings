import type { VimEditor } from './VimEditor.d.ts';
import type { VimState } from './VimState.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface VimApi {
    /** @todo Documentation incomplete. */
    suppressErrorLogging: boolean;

    /** @todo Documentation incomplete. */
    _mapCommand(command: unknown): unknown;

    /** @todo Documentation incomplete. */
    buildKeyMap(): void;

    /** @todo Documentation incomplete. */
    defineAction(name: string, fn: (cm: VimEditor, actionArgs: unknown, vim: VimState['vim']) => void): void;

    /** @todo Documentation incomplete. */
    defineEx(name: unknown, prefix: unknown, func: unknown): unknown;

    /** @todo Documentation incomplete. */
    defineMotion(name: unknown, fn: unknown): unknown;

    /** @todo Documentation incomplete. */
    defineOperator(name: unknown, fn: unknown): unknown;

    /** @todo Documentation incomplete. */
    defineOption(name: unknown, defaultValue: unknown, type: unknown, aliases: unknown, callback: unknown): unknown;

    /** @todo Documentation incomplete. */
    defineRegister(name: unknown, register: unknown): unknown;

    /** @todo Documentation incomplete. */
    enterInsertMode(cm: unknown): unknown;

    /** @todo Documentation incomplete. */
    enterVimMode(cm: unknown): unknown;

    /** @todo Documentation incomplete. */
    exitInsertMode(cm: unknown, keepCursor: unknown): unknown;

    /** @todo Documentation incomplete. */
    exitVisualMode(cm: unknown, moveHead: unknown): unknown;

    /** @todo Documentation incomplete. */
    findKey(cm: unknown, key: unknown, origin: unknown): unknown;

    /** @todo Documentation incomplete. */
    getOption(name: unknown, cm: unknown, cfg: unknown): unknown;

    /** @todo Documentation incomplete. */
    getRegisterController(): unknown;

    /** @todo Documentation incomplete. */
    getVimGlobalState_(): unknown;

    /** @todo Documentation incomplete. */
    handleEx(cm: unknown, input: unknown): unknown;

    /** @todo Documentation incomplete. */
    handleKey(cm: unknown, key: unknown, origin: unknown): unknown;

    /** @todo Documentation incomplete. */
    InsertModeKey(keyName: string): void;

    /** @todo Documentation incomplete. */
    leaveVimMode(cm: unknown): unknown;

    /** @todo Documentation incomplete. */
    map(lhs: unknown, rhs: unknown, ctx: unknown): unknown;

    /** @todo Documentation incomplete. */
    mapclear(ctx: unknown): unknown;

    /** @todo Documentation incomplete. */
    mapCommand(keys: unknown, type: unknown, name: unknown, args: unknown, extra: unknown): unknown;

    /** @todo Documentation incomplete. */
    maybeInitVimState_(cm: unknown): unknown;

    /** @todo Documentation incomplete. */
    multiSelectHandleKey(cm: unknown, key: unknown, origin: unknown): unknown;

    /** @todo Documentation incomplete. */
    noremap(lhs: unknown, rhs: unknown, ctx: unknown): unknown;

    /** @todo Documentation incomplete. */
    resetVimGlobalState_(): unknown;

    /** @todo Documentation incomplete. */
    setOption(name: unknown, value: unknown, cm: unknown, cfg: unknown): unknown;

    /** @todo Documentation incomplete. */
    unmap(lhs: unknown, ctx: unknown): unknown;
}
