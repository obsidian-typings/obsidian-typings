export { };

import type { FootnoteCache } from "../index.d.ts";

declare module "obsidian" {
    interface CachedMetadata {
        footnotes?: FootnoteCache[];
    }
}
