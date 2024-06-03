import type { App } from "obsidian";

/** @todo Documentation incomplete */
export default interface BlockCache {
    /**
     * Reference to App
     */
    app: App;
    /** @internal */
    cache: unknown;
}
