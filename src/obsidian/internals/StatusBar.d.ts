import type { App } from 'obsidian';

/** @public */
export interface StatusBar {
    app: App;
    containerEl: HTMLElement;
}
