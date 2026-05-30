import type { App } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';
import type { PdfView } from '../../../../internals/views/PdfView.d.ts';

import { ViewType } from '../../../constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';

/**
 * Get the {@link PdfView} constructor.
 *
 * @param app - The app.
 * @returns The {@link PdfView} constructor.
 *
 * @public
 * @unofficial
 */
export function getPdfViewConstructor(app: App): ExtractConstructor<PdfView> {
  return getViewConstructorByViewType(app, ViewType.Pdf);
}
