import type {
    Vault,
    Workspace
} from 'obsidian';
import type { RecentFileTracker } from '../../RecentFileTracker.d.ts';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The RecentFileTracker constructor.
 *
 * @public
 * @unofficial
 */
export interface RecentFileTrackerConstructor extends ConstructorBase<[workspace: Workspace, vault: Vault], RecentFileTracker> {}
