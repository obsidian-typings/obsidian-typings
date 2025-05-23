import type { LinkUpdate } from './LinkUpdate.d.ts';

/**
 * @todo Documentation incomplete.
 *
 * @public
 * @unofficial
 */
export type LinkUpdatesHandler = (linkUpdates: LinkUpdate[]) => Promise<void>;
