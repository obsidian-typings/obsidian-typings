import type { App } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';
import type { BacklinkView } from '../../../../internals/internal-plugins/backlink/BacklinkView.d.ts';

import { ViewType } from '../../../constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the BacklinkView constructor.
 *
 * @param app - The app.
 * @returns The BacklinkView constructor.
 *
 * @public
 * @unofficial
 */
export function getBacklinkViewConstructor(app: App): ExtractConstructor<BacklinkView> {
  return getViewConstructorByViewType(app, ViewType.Backlink);
}
