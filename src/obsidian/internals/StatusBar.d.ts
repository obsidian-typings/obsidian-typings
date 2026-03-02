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
}
