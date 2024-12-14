import type { DataAdapter, App } from "obsidian";

/**
 * The App constructor.
 *
 * @public
 */
export type AppConstructor = new (adapter: DataAdapter, appId: string) => App;
