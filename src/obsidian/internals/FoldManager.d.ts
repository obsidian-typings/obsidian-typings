/** @todo Documentation incomplete */

import type { App } from 'obsidian';

/** @public */
export interface FoldManager {
    app: App;

    cleanup(): unknown;
    load(arg1: unknown): unknown;
    loadPath(arg1: unknown): unknown;
    save(arg1: unknown, arg2: unknown): unknown;
    savePath(arg1: unknown, arg2: unknown): unknown;
}
