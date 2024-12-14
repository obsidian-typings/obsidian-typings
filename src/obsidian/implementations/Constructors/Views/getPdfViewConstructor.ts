import type { App } from 'obsidian';
import type { PdfView } from '../../../internals/Views/PdfView.js';
import { ViewType } from '../../Constants/ViewType.ts';
import { getViewConstructorByViewType } from './getViewConstructorByViewType.ts';
import type { TypedViewConstructor } from '../../../internals/Constructors/Views/TypedViewConstructor.ts';

/**
 * Get the PdfView constructor.
 *
 * @returns The PdfView constructor.
 * @public
 */
export function getPdfViewConstructor(app: App): TypedViewConstructor<PdfView> {
    return getViewConstructorByViewType(app, ViewType.Pdf) as TypedViewConstructor<PdfView>;
}
