import type { ElectronNativeImage } from './ElectronNativeImage.d.ts';

/**
 * The item to drag during a drag-and-drop operation.
 *
 * @public
 * @unofficial
 */
export interface ElectronItem {
  /** The path to the file being dragged. */
  file: string;

  /** The paths to the files being dragged. Overrides the `file` field. */
  files?: string[];

  /** The image shown under the cursor while dragging. Must be non-empty on macOS. */
  icon: ElectronNativeImage | string;
}
