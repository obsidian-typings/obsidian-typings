import type { LinkUpdate } from "./LinkUpdate.js";

/** @public */
export type LinkUpdateHandler = (link: LinkUpdate) => void | Promise<void>;
