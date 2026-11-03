import type { ElectronInterop } from './ElectronInterop.d.ts';

/**
 * Selects an installed public module member when that Electron version exports it.
 *
 * @public
 * @unofficial
 */
export type ElectronModuleMember<Name extends string, Standalone> = Name extends keyof ElectronInterop<'ElectronNamespace', object> ? ElectronInterop<'ElectronNamespace', object>[Name] : Standalone;
