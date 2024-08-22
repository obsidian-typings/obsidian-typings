import type { App } from "obsidian";

declare global {
    /** Global reference to the app
     * @public
     * @deprecated - Prefer not to use this value directly.
     */
    var app: App;
}
