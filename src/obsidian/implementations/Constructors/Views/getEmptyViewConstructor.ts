import type { App } from 'obsidian';
import type { EmptyView } from '../../../internals/Views/EmptyView.js';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';
import type { TypedViewConstructor } from './TypedViewConstructor.ts';

/**
 * Get the EmptyView constructor.
 *
 * @returns The EmptyView constructor.
 * @public
 */
export function getEmptyViewConstructor(app: App): TypedViewConstructor<EmptyView> {
    return getViewConstructorByViewType(app, ViewType.Empty) as TypedViewConstructor<EmptyView>;
}
