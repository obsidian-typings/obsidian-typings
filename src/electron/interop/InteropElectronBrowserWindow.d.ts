import type { ElectronBrowserWindow } from '../internals/ElectronBrowserWindow.d.ts';
import type { ElectronInterop } from './ElectronInterop.d.ts';
import type { InteropElectronWebContents } from './InteropElectronWebContents.d.ts';

/**
 * The selected ElectronBrowserWindow contract at Obsidian's Electron boundary.
 *
 * @public
 * @unofficial
 */
export type InteropElectronBrowserWindow = { readonly webContents: InteropElectronWebContents } & ElectronInterop<'ElectronBrowserWindow', ElectronBrowserWindow>;
