import type { RenderTask } from '../internals/RenderTask.d.ts';
import type { PdfJsInterop } from './PdfJsInterop.d.ts';

/**
 * The selected RenderTask contract at Obsidian's PDF.js boundary.
 *
 * @public
 * @unofficial
 */
export type InteropRenderTask = PdfJsInterop<'RenderTask', RenderTask>;
