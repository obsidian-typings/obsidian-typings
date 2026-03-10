import type { App } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';
import type { GraphView } from '../../../../internals/internal-plugins/graph/GraphView.d.ts';

import { ViewType } from '../../../constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the GraphView constructor.
 *
 * @param app - The app.
 * @returns The GraphView constructor.
 *
 * @public
 * @unofficial
 */
export function getGraphViewConstructor(app: App): ExtractConstructor<GraphView> {
  return getViewConstructorByViewType(app, ViewType.Graph);
}
