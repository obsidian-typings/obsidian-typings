import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';
import type { RecentFileTracker } from '../../../internals/RecentFileTracker.d.ts';

type RecentFileTrackerConstructor = ExtractConstructor<RecentFileTracker>;

/**
 * Get the RecentFileTracker constructor.
 *
 * @param app - The app instance.
 * @returns The RecentFileTracker constructor.
 *
 * @public
 * @unofficial
 */
export function getRecentFileTrackerConstructor(app: App): RecentFileTrackerConstructor {
    return app.workspace.recentFileTracker.constructor as RecentFileTrackerConstructor;
}
