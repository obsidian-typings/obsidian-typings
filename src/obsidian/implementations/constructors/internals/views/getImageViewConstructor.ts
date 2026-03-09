import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';
import type { ImageView } from '../../../../internals/views/ImageView.d.ts';
import { ViewType } from '../../../constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the ImageView constructor.
 *
 * @param app - The app.
 * @returns The ImageView constructor.
 *
 * @public
 * @unofficial
 */
export function getImageViewConstructor(app: App): ExtractConstructor<ImageView> {
    return getViewConstructorByViewType(app, ViewType.Image);
}
