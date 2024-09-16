import type { App } from 'obsidian';
import type { CapacitorAdapterFs } from './internals/CapacitorAdapterFs.js';

declare global {
    /** Global reference to the app
     * @public
     * @deprecated - Prefer not to use this value directly.
     */
    var app: App;

    /** @public
     * Constructor for the Capacitor file system adapter
     */
    var FS: new () => CapacitorAdapterFs;
}
