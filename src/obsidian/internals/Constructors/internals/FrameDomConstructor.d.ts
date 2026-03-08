import type { FrameDom } from '../../FrameDom.d.ts';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The FrameDom constructor.
 *
 * @public
 * @unofficial
 */
export interface FrameDomConstructor extends ConstructorBase<[electronWindow: Electron.BrowserWindow, win: Window], FrameDom> {}
