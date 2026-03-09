import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';
import type { SyncView } from '../../../../internals/internal-plugins/sync/SyncView.d.ts';
import { ViewType } from '../../../constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the SyncView constructor.
 *
 * @param app - The app.
 * @returns The SyncView constructor.
 *
 * @public
 * @unofficial
 */
export function getSyncViewConstructor(app: App): ExtractConstructor<SyncView> {
  return getViewConstructorByViewType(app, ViewType.Sync);
}
