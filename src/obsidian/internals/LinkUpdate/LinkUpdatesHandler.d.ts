import type { LinkUpdate } from './LinkUpdate.d.ts';

/**
 * @public
 * @unofficial
 */
export type LinkUpdatesHandler = (linkUpdates: LinkUpdate[]) => Promise<void>;
