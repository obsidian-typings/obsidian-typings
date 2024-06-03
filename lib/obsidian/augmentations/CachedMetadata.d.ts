export { };

import type { FootnoteCache } from "../types.d.ts";

declare module "obsidian" {
    interface CachedMetadata {
        footnotes?: FootnoteCache[];
    }
}
