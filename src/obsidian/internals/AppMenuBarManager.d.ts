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
    /**
     * @todo Documentation incomplete.
     */
    app: App;

    /**
     * @todo Documentation incomplete.
     */
    constructor: AppMenuBarManagerConstructor;

    /**
     * @todo Documentation incomplete.
     */
    onLayoutChange: Debouncer<[], unknown>;

    /**
     * @todo Documentation incomplete.
     */
    onWindowFrameChange: Debouncer<[], unknown>;

    /**
     * @todo Documentation incomplete.
     */
    requestRender: Debouncer<[], unknown>;

    /**
     * @todo Documentation incomplete.
     */
    _onLayoutChange(): unknown;

    /**
     * @todo Documentation incomplete.
     */
    applyHotkeys(arg1: unknown): unknown;

    /**
     * @todo Documentation incomplete.
     */
    buildMenu(): unknown;

    /**
     * @todo Documentation incomplete.
     */
    getAcceleratorFromHotkey(arg1: unknown): unknown;

    /**
     * @todo Documentation incomplete.
     */
    hideUnregisteredCommands(arg1: unknown): unknown;

    /**
     * @todo Documentation incomplete.
     */
    render(): unknown;

    /**
     * @todo Documentation incomplete.
     */
    updateShareMenuItem(arg1: unknown): unknown;

    /**
     * @todo Documentation incomplete.
     */
    updateViewState(): unknown;

    /**
     * @todo Documentation incomplete.
     */
    updateWorkspace(): unknown;
}
