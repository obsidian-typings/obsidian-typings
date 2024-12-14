import type {
    App
} from 'obsidian';
import type { SyncViewConstructor } from '../../../internals/Constructors/Views/SyncViewConstructor.ts';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the SyncView constructor.
 *
 * @returns The SyncView constructor.
 * @public
 */
export function getSyncViewConstructor(app: App): SyncViewConstructor {
    return getViewConstructorByViewType(app, ViewType.Sync) as SyncViewConstructor;
}
