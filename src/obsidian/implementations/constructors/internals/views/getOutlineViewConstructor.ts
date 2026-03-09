import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';
import type { OutlineView } from '../../../../internals/internal-plugins/outline/OutlineView.d.ts';
import { ViewType } from '../../../constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the OutlineView constructor.
 *
 * @param app - The app.
 * @returns The OutlineView constructor.
 *
 * @public
 * @unofficial
 */
export function getOutlineViewConstructor(app: App): ExtractConstructor<OutlineView> {
  return getViewConstructorByViewType(app, ViewType.Outline);
}
