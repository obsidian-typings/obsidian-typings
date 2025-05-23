import type { App } from 'obsidian';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface CanvasDataManager {
    /** @todo Documentation incomplete. */
    app: App;

    /** @todo Documentation incomplete. */
    handleDelete(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    handleRename(arg1: unknown, arg2: unknown): unknown;

    /** @todo Documentation incomplete. */
    load(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    remove(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    save(arg1: unknown, arg2: unknown): unknown;
}
