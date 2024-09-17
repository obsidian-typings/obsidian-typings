import type { VimEditor } from './VimEditor.js';
import type { VimState } from './VimState.js';

/**
 * @public
 */
export interface VimApi {
    InsertModeKey(keyName: string): void;
    buildKeyMap(): void;
    defineAction(name: string, fn: (cm: VimEditor, actionArgs: unknown, vim: VimState['vim']) => void): void;
    defineEx(name: unknown, prefix: unknown, func: unknown): unknown;
    defineMotion(name: unknown, fn: unknown): unknown;
    defineOperator(name: unknown, fn: unknown): unknown;
    defineOption(name: unknown, defaultValue: unknown, type: unknown, aliases: unknown, callback: unknown): unknown;
    defineRegister(name: unknown, register: unknown): unknown;
    enterInsertMode(cm: unknown): unknown;
    enterVimMode(cm: unknown): unknown;
    exitInsertMode(cm: unknown, keepCursor: unknown): unknown;
    exitVisualMode(cm: unknown, moveHead: unknown): unknown;
    findKey(cm: unknown, key: unknown, origin: unknown): unknown;
    getOption(name: unknown, cm: unknown, cfg: unknown): unknown;
    getRegisterController(): unknown;
    getVimGlobalState_(): unknown;
    handleEx(cm: unknown, input: unknown): unknown;
    handleKey(cm: unknown, key: unknown, origin: unknown): unknown;
    leaveVimMode(cm: unknown): unknown;
    map(lhs: unknown, rhs: unknown, ctx: unknown): unknown;
    mapCommand(keys: unknown, type: unknown, name: unknown, args: unknown, extra: unknown): unknown;
    mapclear(ctx: unknown): unknown;
    maybeInitVimState_(cm: unknown): unknown;
    multiSelectHandleKey(cm: unknown, key: unknown, origin: unknown): unknown;
    noremap(lhs: unknown, rhs: unknown, ctx: unknown): unknown;
    resetVimGlobalState_(): unknown;
    setOption(name: unknown, value: unknown, cm: unknown, cfg: unknown): unknown;
    suppressErrorLogging: boolean;
    unmap(lhs: unknown, ctx: unknown): unknown;
    _mapCommand(command: unknown): unknown;
}
