/** @todo Documentation incomplete */

import type {
    App,
    Debouncer
} from 'obsidian';
import type { AppMenuBarManagerConstructor } from './AppMenuBarManagerConstructor.d.ts';

/**
 * @public
 * @unofficial
 */
export interface AppMenuBarManager {
    app: App;
    constructor: AppMenuBarManagerConstructor;
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
