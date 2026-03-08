import type { App } from 'obsidian';
import type { RecentFileTrackerConstructor } from '../../../internals/constructors/internals/RecentFileTrackerConstructor.d.ts';

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
