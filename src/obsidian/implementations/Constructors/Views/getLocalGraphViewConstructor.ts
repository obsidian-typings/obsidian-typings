import type { App } from 'obsidian';
import type { LocalGraphView } from '../../../internals/InternalPlugins/Graph/LocalGraphView.js';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';
import type { TypedViewConstructor } from './TypedViewConstructor.ts';

/**
 * Get the LocalGraphView constructor.
 *
 * @returns The LocalGraphView constructor.
 */

export function getLocalGraphViewConstructor(app: App): TypedViewConstructor<LocalGraphView> {
    return getViewConstructorByViewType(app, ViewType.LocalGraph) as TypedViewConstructor<LocalGraphView>;
}
