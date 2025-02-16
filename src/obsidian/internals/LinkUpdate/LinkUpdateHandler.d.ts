import type { LinkUpdate } from './LinkUpdate.d.ts';

/** @public */
export type LinkUpdateHandler = (link: LinkUpdate) => void | Promise<void>;
