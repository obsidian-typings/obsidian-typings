import type { App } from 'obsidian';

/**
 * The status bar displayed at the bottom of the application window.
 * @public
 * @unofficial
 */
export interface StatusBar {
    /** Reference to the app. */
    app: App;

    /** Container element for the status bar. */
    containerEl: HTMLElement;

    /**
     * Constructor.
     *
     * @param app - The app.
     * @param containerEl - The containerEl.
     * @returns The new instance.
     * @deprecated - Added only for typing purposes. Use `ExtractConstructor<StatusBar>` or `getStatusBarConstructor()` instead.
     */
    constructor__(app: App, containerEl: HTMLElement): this;

    /**
     * Register a new status bar item element.
     *
     * @returns The newly created status bar item element.
     */
    registerStatusBarItem(): HTMLElement;
}
