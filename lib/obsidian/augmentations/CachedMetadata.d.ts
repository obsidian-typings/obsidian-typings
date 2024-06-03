import type { FootnoteCache } from "../types.d.ts";

export {};

declare module "obsidian" {
    interface CachedMetadata {
        footnotes?: FootnoteCache[];
    }
}
