import type { App } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';
import type { BasesView } from '../../../../internals/internal-plugins/bases/BasesView.d.ts';

import { ViewType } from '../../../constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the BasesView constructor.
 *
 * @param app - The app.
 * @returns The BasesView constructor.
 *
 * @public
 * @unofficial
 */
export function getBasesViewConstructor(app: App): ExtractConstructor<BasesView> {
  return getViewConstructorByViewType(app, ViewType.Bases);
}
