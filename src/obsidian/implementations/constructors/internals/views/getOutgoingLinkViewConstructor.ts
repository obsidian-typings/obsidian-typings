import type { App } from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';
import type { OutgoingLinkView } from '../../../../internals/internal-plugins/outgoing-link/OutgoingLinkView.d.ts';
import { ViewType } from '../../../constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the OutgoingLinkView constructor.
 *
 * @param app - The app.
 * @returns The OutgoingLinkView constructor.
 *
 * @public
 * @unofficial
 */
export function getOutgoingLinkViewConstructor(app: App): ExtractConstructor<OutgoingLinkView> {
    return getViewConstructorByViewType(app, ViewType.OutgoingLink);
}
