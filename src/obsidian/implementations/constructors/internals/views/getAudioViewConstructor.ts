import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';
import type { AudioView } from '../../../../internals/views/AudioView.d.ts';
import { ViewType } from '../../../constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the AudioView constructor.
 *
 * @param app - The app.
 * @returns The AudioView constructor.
 *
 * @public
 * @unofficial
 */
export function getAudioViewConstructor(app: App): ExtractConstructor<AudioView> {
  return getViewConstructorByViewType(app, ViewType.Audio);
}
