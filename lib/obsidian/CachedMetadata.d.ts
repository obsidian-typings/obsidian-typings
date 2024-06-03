export { };

import type { FootnoteCache } from "./internals/index.d.ts";

declare module "obsidian" {
    interface CachedMetadata {
        footnotes?: FootnoteCache[];
    }
}
