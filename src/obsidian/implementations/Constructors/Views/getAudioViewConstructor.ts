import type { App } from 'obsidian';
import type { AudioView } from '../../../internals/Views/AudioView.js';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';
import type { TypedViewConstructor } from '../../../internals/Constructors/Views/TypedViewConstructor.ts';

/**
 * Get the AudioView constructor.
 *
 * @returns The AudioView constructor.
 * @public
 */
export function getAudioViewConstructor(app: App): TypedViewConstructor<AudioView> {
    return getViewConstructorByViewType(app, ViewType.Audio) as TypedViewConstructor<AudioView>;
}
