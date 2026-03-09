import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';
import type { VideoView } from '../../../../internals/views/VideoView.d.ts';
import { ViewType } from '../../../constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the VideoView constructor.
 *
 * @param app - The app.
 * @returns The VideoView constructor.
 *
 * @public
 * @unofficial
 */
export function getVideoViewConstructor(app: App): ExtractConstructor<VideoView> {
  return getViewConstructorByViewType(app, ViewType.Video);
}
