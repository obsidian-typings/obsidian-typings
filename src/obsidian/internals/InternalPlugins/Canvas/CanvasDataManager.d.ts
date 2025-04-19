import type { App } from 'obsidian';

/** @public @unofficial */
export interface CanvasDataManager {
    app: App;

    handleDelete(arg1: unknown): unknown;
    handleRename(arg1: unknown, arg2: unknown): unknown;
    load(arg1: unknown): unknown;
    remove(arg1: unknown): unknown;
    save(arg1: unknown, arg2: unknown): unknown;
}
