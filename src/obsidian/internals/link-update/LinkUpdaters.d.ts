import type { CanvasLinkUpdater } from './CanvasLinkUpdater.d.ts';
import type { LinkUpdater } from './LinkUpdater.d.ts';

/**
 * Record of link updaters keyed by file type, used to update links when files are renamed or moved.
 * @public
 * @unofficial
 */
export interface LinkUpdaters extends Record<string, LinkUpdater> {
  /** Link updater for canvas files. */
  canvas?: CanvasLinkUpdater;
}
