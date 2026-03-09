import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';
import type { EmptyView } from '../../../../internals/views/EmptyView.d.ts';
import { ViewType } from '../../../constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the EmptyView constructor.
 *
 * @param app - The app.
 * @returns The EmptyView constructor.
 *
 * @public
 * @unofficial
 */
export function getEmptyViewConstructor(app: App): ExtractConstructor<EmptyView> {
  return getViewConstructorByViewType(app, ViewType.Empty);
}
