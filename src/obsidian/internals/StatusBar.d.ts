import type { App } from 'obsidian';

/** @public @unofficial */
export interface StatusBar {
    app: App;
    containerEl: HTMLElement;
}
