import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';
import type { LocalGraphView } from '../../../../internals/internal-plugins/graph/LocalGraphView.d.ts';
import { ViewType } from '../../../constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the LocalGraphView constructor.
 *
 * @param app - The app.
 * @returns The LocalGraphView constructor.
 *
 * @public
 * @unofficial
 */
export function getLocalGraphViewConstructor(app: App): ExtractConstructor<LocalGraphView> {
  return getViewConstructorByViewType(app, ViewType.LocalGraph);
}
