import type { ICanvas } from '../internals/ICanvas.d.ts';
import type { PixiInterop } from './PixiInterop.d.ts';

/**
 * The selected ICanvas contract at Obsidian's Pixi boundary.
 *
 * @public
 * @unofficial
 */
export type InteropICanvas = PixiInterop<'ICanvas', ICanvas>;
