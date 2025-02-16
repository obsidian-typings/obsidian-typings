import type { App } from 'obsidian';
import type { TypedViewConstructor } from '../../../internals/Constructors/Views/TypedViewConstructor.ts';
import type { BacklinkView } from '../../../internals/InternalPlugins/Backlink/BacklinkView.d.ts';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the BacklinkView constructor.
 *
 * @returns The BacklinkView constructor.
 * @public
 */
export function getBacklinkViewConstructor(app: App): TypedViewConstructor<BacklinkView> {
    return getViewConstructorByViewType(app, ViewType.Backlink) as TypedViewConstructor<BacklinkView>;
}
