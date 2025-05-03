/**
 * @todo Documentation incomplete
 * @public
 * @unofficial
 */
export interface FrameDom {
    /** @todo Documentation incomplete. */
    eWin: Electron.BrowserWindow;

    /** @todo Documentation incomplete. */
    isMac: boolean;

    /** @todo Documentation incomplete. */
    leftButtonContainerEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    titleBarEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    titleBarInnerEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    titleBarTextEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    win: Window;

    /** @todo Documentation incomplete. */
    updateStatus(): void;

    /** @todo Documentation incomplete. */
    updateTitle(): void;
}
