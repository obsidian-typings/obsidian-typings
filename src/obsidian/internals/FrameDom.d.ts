/**
 * DOM elements for the custom window frame (title bar) on desktop.
 * @public
 * @unofficial
 */
export interface FrameDom {
    /** Reference to the Electron browser window. */
    eWin: Electron.BrowserWindow;

    /** Whether the current platform is macOS. */
    isMac: boolean;

    /** Container for window control buttons on the left side. */
    leftButtonContainerEl: HTMLDivElement;

    /** The title bar element. */
    titleBarEl: HTMLDivElement;

    /** Inner container of the title bar. */
    titleBarInnerEl: HTMLDivElement;

    /** Element displaying the title bar text. */
    titleBarTextEl: HTMLDivElement;

    /** Update the window status indicators in the title bar. */
    updateStatus(): void;

    /** Update the displayed title in the title bar. */
    updateTitle(): void;

    /** Reference to the window object. */
    win: Window;
}
