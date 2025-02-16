import type { App } from 'obsidian';
import type { TypedViewConstructor } from '../../../internals/Constructors/Views/TypedViewConstructor.ts';
import type { LocalGraphView } from '../../../internals/InternalPlugins/Graph/LocalGraphView.d.ts';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the LocalGraphView constructor.
 *
 * @returns The LocalGraphView constructor.
 * @public
 */
export function getLocalGraphViewConstructor(app: App): TypedViewConstructor<LocalGraphView> {
    return getViewConstructorByViewType(app, ViewType.LocalGraph) as TypedViewConstructor<LocalGraphView>;
}
