import type { App } from 'obsidian';

/** @public @unofficial */
export interface HeaderDom {
    app: App;
    navButtonsEl: HTMLDivElement;
    navHeaderEl: HTMLDivElement;

    addNavButton(arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown): unknown;
    addSortButton(arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown): unknown;
}
