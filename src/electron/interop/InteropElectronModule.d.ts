import type { ElectronIpcRenderer } from '../internals/ElectronIpcRenderer/ElectronIpcRenderer.d.ts';
import type { ElectronModule } from '../internals/ElectronModule.d.ts';
import type { ElectronInterop } from './ElectronInterop.d.ts';
import type { ElectronModuleMember } from './ElectronModuleMember.d.ts';
import type { InteropElectronRemote } from './InteropElectronRemote.d.ts';

/**
 * Selected renderer modules, retaining Obsidian's IPC channel overloads.
 *
 * @public
 * @unofficial
 */
export type InteropElectronModule = {
  [Key in keyof ElectronModule]: Key extends 'remote' ? InteropElectronRemote
    : Key extends 'ipcRenderer' ? ElectronInterop<'ElectronIpcRenderer', object> & ElectronIpcRenderer
    : ElectronModuleMember<Key, ElectronModule[Key]>;
};
