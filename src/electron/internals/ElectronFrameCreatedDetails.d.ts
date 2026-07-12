import type { ElectronWebFrameMain } from './ElectronWebFrameMain.d.ts';

/**
 * Details about a newly created frame.
 *
 * @public
 * @unofficial
 */
export interface ElectronFrameCreatedDetails {
  /** The frame that was created. */
  frame: ElectronWebFrameMain;
}
