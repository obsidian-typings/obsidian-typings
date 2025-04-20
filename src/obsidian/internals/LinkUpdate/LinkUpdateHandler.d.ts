import type { LinkUpdate } from './LinkUpdate.d.ts';

/**
 * @public
 * @unofficial
 */
export type LinkUpdateHandler = (link: LinkUpdate) => void | Promise<void>;
