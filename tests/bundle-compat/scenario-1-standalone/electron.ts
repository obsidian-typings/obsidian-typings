import type {
  ElectronBrowserWindow,
  ElectronNativeImage,
  ElectronRectangle,
  ElectronWindow,
  FrameDom,
  ObsidianIpcRegisterCliResult
} from 'obsidian-typings';

declare const frame: FrameDom;
declare const image: ElectronNativeImage;
declare const rectangle: ElectronRectangle;
declare const extendedWindow: ElectronWindow;

const browserWindow: ElectronBrowserWindow = frame.eWin;
frame.eWin.setBounds(rectangle);
const bitmap: Buffer = image.getBitmap();
extendedWindow.setFrameZoomLevel(1);
const cli: Promise<ObsidianIpcRegisterCliResult> = electron.ipcRenderer.invoke('register-cli');
void [browserWindow, bitmap, cli];
