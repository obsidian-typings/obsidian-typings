/** @todo Documentation incomplete */

import type { App } from 'obsidian';

/**
 * @public
 * @unofficial
 */
export interface FoldManager {
    /** @todo Documentation incomplete. */
    app: App;

    /** @todo Documentation incomplete. */
    cleanup(): unknown;

    /** @todo Documentation incomplete. */
    load(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    loadPath(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    save(arg1: unknown, arg2: unknown): unknown;

    /** @todo Documentation incomplete. */
    savePath(arg1: unknown, arg2: unknown): unknown;
}
