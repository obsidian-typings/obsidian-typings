import type { BrowserWindow } from 'electron';

/** @public */
export interface ElectronWindow extends BrowserWindow {
    _browserViews: unknown;
    _events: unknown;
    _eventsCount: unknown;
    devToolsWebContents: unknown;
}
