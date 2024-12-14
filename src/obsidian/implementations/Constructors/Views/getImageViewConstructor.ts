import type { App } from 'obsidian';
import type { TypedViewConstructor } from '../../../internals/Constructors/Views/TypedViewConstructor.ts';
import type { ImageView } from '../../../internals/Views/ImageView.js';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the ImageView constructor.
 *
 * @returns The ImageView constructor.
 * @public
 */
export function getImageViewConstructor(app: App): TypedViewConstructor<ImageView> {
    return getViewConstructorByViewType(app, ViewType.Image) as TypedViewConstructor<ImageView>;
}
