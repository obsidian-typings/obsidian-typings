import type { FootnoteCache } from "../types.js";

export {};

declare module "obsidian" {
    interface CachedMetadata {
        footnotes?: FootnoteCache[];
    }
}
