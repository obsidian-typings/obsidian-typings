import type { App } from 'obsidian';
import type { TypedViewConstructor } from '../../../internals/Constructors/Views/TypedViewConstructor.ts';
import type { TagView } from '../../../internals/Views/TagView.d.ts';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the TagView constructor.
 *
 * @returns The TagView constructor.
 * @public
 */
export function getTagViewConstructor(app: App): TypedViewConstructor<TagView> {
    return getViewConstructorByViewType(app, ViewType.Tag) as TypedViewConstructor<TagView>;
}
