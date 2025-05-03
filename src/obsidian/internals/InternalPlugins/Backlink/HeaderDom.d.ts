import type { App } from 'obsidian';

/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface HeaderDom {
    /** @todo Documentation incomplete. */
    app: App;

    /** @todo Documentation incomplete. */
    navButtonsEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    navHeaderEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    addNavButton(arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown): unknown;

    /** @todo Documentation incomplete. */
    addSortButton(arg1: unknown, arg2: unknown, arg3: unknown, arg4: unknown): unknown;
}
