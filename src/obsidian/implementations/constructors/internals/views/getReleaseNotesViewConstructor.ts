import type { App } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';
import type { ReleaseNotesView } from '../../../../internals/views/ReleaseNotesView.d.ts';

import { ViewType } from '../../../constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the ReleaseNotesView constructor.
 *
 * @param app - The app.
 * @returns The ReleaseNotesView constructor.
 *
 * @public
 * @unofficial
 */
export function getReleaseNotesViewConstructor(app: App): ExtractConstructor<ReleaseNotesView> {
  return getViewConstructorByViewType(app, ViewType.ReleaseNotes);
}
