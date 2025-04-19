/** @public @unofficial */
export interface FrameDom {
    eWin: Electron.BrowserWindow;
    isMac: boolean;
    leftButtonContainerEl: HTMLDivElement;
    titleBarEl: HTMLDivElement;
    titleBarInnerEl: HTMLDivElement;
    titleBarTextEl: HTMLDivElement;
    win: Window;

    updateStatus(): void;
    updateTitle(): void;
}
