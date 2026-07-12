import type { ElectronWebFrameMain } from './ElectronWebFrameMain.d.ts';

/**
 * The `webFrameMain` module accessor exposed on {@link ElectronRemote}, distinct from the
 * {@link ElectronWebFrameMain} class it returns.
 *
 * @public
 * @unofficial
 */
export interface ElectronWebFrameMainModule {
  /**
   * Returns the frame with the given process and routing ids, or `undefined` if none is found.
   *
   * @param processId - The process id.
   * @param routingId - The routing id.
   * @returns The matching frame, or `undefined`.
   */
  fromId(processId: number, routingId: number): ElectronWebFrameMain | undefined;
}
