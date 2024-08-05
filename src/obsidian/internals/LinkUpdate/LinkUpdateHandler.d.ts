import type { LinkUpdate } from "./LinkUpdate.js";

export type LinkUpdateHandler = (link: LinkUpdate) => void | Promise<void>;
