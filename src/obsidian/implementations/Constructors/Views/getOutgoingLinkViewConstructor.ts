import type { App } from 'obsidian';
import type { TypedViewConstructor } from '../../../internals/Constructors/Views/TypedViewConstructor.ts';
import type { OutgoingLinkView } from '../../../internals/InternalPlugins/OutgoingLink/OutgoingLinkView.d.ts';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the OutgoingLinkView constructor.
 *
 * @returns The OutgoingLinkView constructor.
 * @public
 */
export function getOutgoingLinkViewConstructor(app: App): TypedViewConstructor<OutgoingLinkView> {
    return getViewConstructorByViewType(app, ViewType.OutgoingLink) as TypedViewConstructor<OutgoingLinkView>;
}
