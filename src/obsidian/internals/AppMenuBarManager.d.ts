import type {
    App,
    Debouncer
} from 'obsidian';
import type { AppMenuBarManagerConstructor } from './AppMenuBarManagerConstructor.d.ts';

/**
 * Manager for the application menu bar (native desktop menu).
 * @public
 * @unofficial
 */
export interface AppMenuBarManager {
    /** Reference to the app. */
    app: App;

    /** Constructor reference for the menu bar manager. */
    constructor: AppMenuBarManagerConstructor;

    /** Debounced handler for workspace layout changes. */
    onLayoutChange: Debouncer<[], unknown>;

    /** Debounced handler for window frame changes. */
    onWindowFrameChange: Debouncer<[], unknown>;

    /** Debounced function to re-render the menu bar. */
    requestRender: Debouncer<[], unknown>;

    /**
     * Internal handler for layout change events.
     *
     * @returns The result of the layout change handling.
     */
    _onLayoutChange(): unknown;

    /**
     * Apply hotkey accelerators to menu items.
     *
     * @returns The result of applying hotkeys.
     */
    applyHotkeys(arg1: unknown): unknown;

    /**
     * Build the native menu bar structure.
     *
     * @returns The built menu structure.
     */
    buildMenu(): unknown;

    /**
     * Convert a hotkey binding to a native accelerator string.
     *
     * @returns The native accelerator string.
     */
    getAcceleratorFromHotkey(arg1: unknown): unknown;

    /**
     * Hide menu items for commands that are not registered.
     *
     * @returns The result of hiding unregistered commands.
     */
    hideUnregisteredCommands(arg1: unknown): unknown;

    /**
     * Render the menu bar.
     *
     * @returns The result of the render operation.
     */
    render(): unknown;

    /**
     * Update the share menu item state.
     *
     * @returns The result of updating the share menu item.
     */
    updateShareMenuItem(arg1: unknown): unknown;

    /**
     * Update the menu bar based on the current view state.
     *
     * @returns The result of updating the view state.
     */
    updateViewState(): unknown;

    /**
     * Update the menu bar based on workspace changes.
     *
     * @returns The result of updating the workspace.
     */
    updateWorkspace(): unknown;
}
