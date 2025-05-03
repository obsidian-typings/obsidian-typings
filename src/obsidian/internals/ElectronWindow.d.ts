import type { BrowserWindow } from 'electron';

/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface ElectronWindow extends BrowserWindow {
    /** @todo Documentation incomplete. */
    _browserViews: unknown;

    /** @todo Documentation incomplete. */
    _events: unknown;

    /** @todo Documentation incomplete. */
    _eventsCount: unknown;

    /** @todo Documentation incomplete. */
    devToolsWebContents: unknown;
}
