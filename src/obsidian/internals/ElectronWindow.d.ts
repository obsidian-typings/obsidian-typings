import type { BrowserWindow } from 'electron';

/**
 * @public
 */
export interface ElectronWindow extends BrowserWindow {
    devToolsWebContents: unknown;
    _browserViews: unknown;
    _events: unknown;
    _eventsCount: unknown;
}
