import type { App } from 'obsidian';
import type { ReleaseNotesView } from '../../../internals/Views/ReleaseNotesView.js';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';
import type { TypedViewConstructor } from '../../../internals/Constructors/Views/TypedViewConstructor.ts';

/**
 * Get the ReleaseNotesView constructor.
 *
 * @returns The ReleaseNotesView constructor.
 * @public
 */
export function getReleaseNotesViewConstructor(app: App): TypedViewConstructor<ReleaseNotesView> {
    return getViewConstructorByViewType(app, ViewType.ReleaseNotes) as TypedViewConstructor<ReleaseNotesView>;
}
