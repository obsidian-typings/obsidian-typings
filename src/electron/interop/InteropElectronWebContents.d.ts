import type { ElectronWebContents } from '../internals/ElectronWebContents.d.ts';
import type { ElectronInterop } from './ElectronInterop.d.ts';

/**
 * Selected web contents, retaining Obsidian's optional context-menu flag.
 *
 * @public
 * @unofficial
 */
export type InteropElectronWebContents = ElectronInterop<'ElectronWebContents', ElectronWebContents> & Partial<Pick<ElectronWebContents, 'noContextMenu'>>;
