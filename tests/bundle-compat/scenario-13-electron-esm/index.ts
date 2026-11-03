import type {
  BrowserWindow,
  Clipboard,
  NativeImage,
  Rectangle,
  WebContents
} from 'electron';
import type {
  ElectronWindow,
  FrameDom,
  ObsidianIpcRegisterCliResult,
  ObsidianIpcVaultEntry
} from 'obsidian-typings';
import type {} from 'obsidian-typings/electron';

declare const frame: FrameDom;
declare const upstreamWindow: BrowserWindow;
declare const upstreamImage: NativeImage;
declare const upstreamRectangle: Rectangle;
declare const localWindow: ElectronWindow;

const frameWindow: BrowserWindow = frame.eWin;
frame.eWin = upstreamWindow;
const extendedWindow: BrowserWindow = localWindow;
const globalWindow: BrowserWindow = window.electronWindow;
const globalVariableWindow: BrowserWindow = electronWindow;
const remoteWindow: BrowserWindow = electron.remote.getCurrentWindow();
const browserWindow: BrowserWindow = new electron.remote.BrowserWindow({ show: false });
const contents: WebContents = electron.remote.getCurrentWebContents();
const image: NativeImage = electron.nativeImage.createEmpty();
const remoteImage: NativeImage = electron.remote.nativeImage.createEmpty();
const clipboard: Clipboard = electron.clipboard;
const rectangle: Rectangle = frame.eWin.getBounds();
frame.eWin.setBounds(upstreamRectangle);
frame.eWin.setIcon(upstreamImage);
window.electronWindow.setFrameZoomLevel(1);
electronWindow.setFrameZoomLevel(1);
void localWindow._browserViews;
void localWindow.devToolsWebContents;
const cli = electron.ipcRenderer.invoke('register-cli');
const vaults = electron.ipcRenderer.sendSync('vault-list');
const windowCli: Promise<ObsidianIpcRegisterCliResult> = window.electron.ipcRenderer.invoke('register-cli');
void [frameWindow, extendedWindow, globalWindow, globalVariableWindow, remoteWindow, browserWindow, contents, image, remoteImage, clipboard, rectangle, cli, vaults, windowCli];

type IsAny<T> = 0 extends (1 & T) ? true : false;
const cliHasType: IsAny<Awaited<typeof cli>> = false;
const vaultsHaveType: IsAny<typeof vaults> = false;
const typedCli: Promise<ObsidianIpcRegisterCliResult> = cli;
const typedVaults: Record<string, ObsidianIpcVaultEntry> = vaults;
const contextMenuFlag: boolean | undefined = frame.eWin.webContents.noContextMenu;
void [cliHasType, vaultsHaveType, typedCli, typedVaults, contextMenuFlag];

const frameHasType: IsAny<typeof frame.eWin> = false;
const imageHasType: IsAny<ReturnType<typeof electron.nativeImage.createEmpty>> = false;
const constructorHasType: IsAny<typeof electron.remote.BrowserWindow> = false;
frame.constructor__?.(upstreamWindow, window);
void [frameHasType, imageHasType, constructorHasType];
