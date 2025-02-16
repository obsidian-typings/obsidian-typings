import type { App } from 'obsidian';
import type { TypedViewConstructor } from '../../../internals/Constructors/Views/TypedViewConstructor.ts';
import type { VideoView } from '../../../internals/Views/VideoView.d.ts';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the VideoView constructor.
 *
 * @returns The VideoView constructor.
 * @public
 */
export function getVideoViewConstructor(app: App): TypedViewConstructor<VideoView> {
    return getViewConstructorByViewType(app, ViewType.Video) as TypedViewConstructor<VideoView>;
}
