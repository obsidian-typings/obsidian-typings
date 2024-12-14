import type { App } from 'obsidian';
import type { VideoView } from '../../../internals/Views/VideoView.js';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';
import type { TypedViewConstructor } from './TypedViewConstructor.ts';

/**
 * Get the VideoView constructor.
 *
 * @returns The VideoView constructor.
 * @public
 */
export function getVideoViewConstructor(app: App): TypedViewConstructor<VideoView> {
    return getViewConstructorByViewType(app, ViewType.Video) as TypedViewConstructor<VideoView>;
}
