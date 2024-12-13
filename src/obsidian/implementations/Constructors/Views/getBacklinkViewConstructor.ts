import type { App } from 'obsidian';
import type { BacklinkView } from '../../../internals/InternalPlugins/Backlink/BacklinkView.js';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';
import type { TypedViewConstructor } from './TypedViewConstructor.ts';

/**
 * Get the BacklinkView constructor.
 *
 * @returns The BacklinkView constructor.
 */

export function getBacklinkViewConstructor(app: App): TypedViewConstructor<BacklinkView> {
    return getViewConstructorByViewType(app, ViewType.Backlink) as TypedViewConstructor<BacklinkView>;
}
