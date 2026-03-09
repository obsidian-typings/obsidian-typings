import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';
import type { TagView } from '../../../../internals/views/TagView.d.ts';
import { ViewType } from '../../../constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the TagView constructor.
 *
 * @param app - The app.
 * @returns The TagView constructor.
 *
 * @public
 * @unofficial
 */
export function getTagViewConstructor(app: App): ExtractConstructor<TagView> {
  return getViewConstructorByViewType(app, ViewType.Tag);
}
