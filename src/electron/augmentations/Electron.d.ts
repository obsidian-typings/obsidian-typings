export {};

declare global {
  namespace Electron {
    type App = import('../internals/ElectronApp.d.ts').ElectronApp;
    type BrowserWindow = import('../internals/BrowserWindow.d.ts').BrowserWindow;
    type Clipboard = import('../internals/ElectronClipboard.d.ts').ElectronClipboard;
    type Dialog = import('../internals/Dialog.d.ts').Dialog;
    type IpcRenderer = import('../internals/IpcRenderer.d.ts').IpcRenderer;
    type Menu = import('../internals/ElectronMenu.d.ts').ElectronMenu;
    type MenuItem = import('../internals/ElectronMenuItem.d.ts').ElectronMenuItem;
    type NativeImage = import('../internals/NativeImage.d.ts').NativeImage;
    type Rectangle = import('../internals/ElectronRectangle.d.ts').ElectronRectangle;
    type Remote = import('../internals/Remote.d.ts').Remote;
    type Shell = import('../internals/Shell.d.ts').Shell;
    type WebContents = import('../internals/WebContents.d.ts').WebContents;
    type WebviewTag = import('../internals/WebviewTag.d.ts').WebviewTag;
  }
}
