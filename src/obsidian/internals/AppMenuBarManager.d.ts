/** @todo Documentation incomplete */

import type {
    App,
    Debouncer
} from 'obsidian';

/** @public */
export interface AppMenuBarManager {
    app: App;
    constructor: {
        updateMenuItems(arg1: unknown, arg2: unknown): unknown;
    };
    onLayoutChange: Debouncer<[], unknown>;
    onWindowFrameChange: Debouncer<[], unknown>;
    requestRender: Debouncer<[], unknown>;

    _onLayoutChange(): unknown;
    applyHotkeys(arg1: unknown): unknown;
    buildMenu(): unknown;
    getAcceleratorFromHotkey(arg1: unknown): unknown;
    hideUnregisteredCommands(arg1: unknown): unknown;
    render(): unknown;
    updateShareMenuItem(arg1: unknown): unknown;
    updateViewState(): unknown;
    updateWorkspace(): unknown;
}
