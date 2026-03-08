import type { LinkUpdate } from './LinkUpdate.d.ts';

/**
 * Callback that processes a batch of link updates when files are renamed or moved.
 *
 * @public
 * @unofficial
 */
export type LinkUpdatesHandler = (linkUpdates: LinkUpdate[]) => Promise<void>;
