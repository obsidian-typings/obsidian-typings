import {
    App,
    type DataAdapter
} from 'obsidian';

type AppConstructor = new(adapter: DataAdapter, appId: string) => App;

/**
 * Get the App constructor.
 *
 * @returns The App constructor.
 */
export function getAppConstructor(): AppConstructor {
    return App as AppConstructor;
}
