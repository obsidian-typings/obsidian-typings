import {
    App,
    type DataAdapter
} from 'obsidian';

type AppConstructor = new(adapter: DataAdapter, appId: string) => App;

/**
 * Constructs a new App instance.
 *
 * @param adapter - The data adapter to use.
 * @param appId - The ID of the app.
 * @returns The constructed App instance.
 */
export function constructApp(adapter: DataAdapter, appId: string): App {
    return new (App as AppConstructor)(adapter, appId);
}
