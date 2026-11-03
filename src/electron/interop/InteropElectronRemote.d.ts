import type { ElectronRemote } from '../internals/ElectronRemote.d.ts';
import type { ElectronModuleMember } from './ElectronModuleMember.d.ts';
import type { InteropElectronBrowserWindow } from './InteropElectronBrowserWindow.d.ts';
import type { InteropElectronWebContents } from './InteropElectronWebContents.d.ts';

/**
 * Selected remote modules and window accessors, retaining Obsidian's remote helpers.
 *
 * @public
 * @unofficial
 */
export type InteropElectronRemote = {
  [Key in keyof ElectronRemote]: Key extends 'getCurrentWindow' ? () => InteropElectronBrowserWindow
    : Key extends 'getCurrentWebContents' ? () => InteropElectronWebContents
    : ElectronModuleMember<Key, ElectronRemote[Key]>;
};
