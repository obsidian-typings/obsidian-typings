import type { App } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';
import type { CanvasView } from '../../../../internals/internal-plugins/canvas/CanvasView.d.ts';

import { ViewType } from '../../../constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the CanvasView constructor.
 *
 * @param app - The app.
 * @returns The CanvasView constructor.
 *
 * @public
 * @unofficial
 */
export function getCanvasViewConstructor(app: App): ExtractConstructor<CanvasView> {
  return getViewConstructorByViewType(app, ViewType.Canvas);
}
