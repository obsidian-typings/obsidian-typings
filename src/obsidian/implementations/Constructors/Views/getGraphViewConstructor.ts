import type { App } from 'obsidian';
import type { TypedViewConstructor } from '../../../internals/Constructors/Views/TypedViewConstructor.ts';
import type { GraphView } from '../../../internals/InternalPlugins/Graph/GraphView.d.ts';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the GraphView constructor.
 *
 * @returns The GraphView constructor.
 * @public
 */
export function getGraphViewConstructor(app: App): TypedViewConstructor<GraphView> {
    return getViewConstructorByViewType(app, ViewType.Graph) as TypedViewConstructor<GraphView>;
}
