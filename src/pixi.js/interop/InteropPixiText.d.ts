import type { PixiText } from '../internals/PixiText.d.ts';
import type { PixiInterop } from './PixiInterop.d.ts';

/**
 * The selected PixiText contract at Obsidian's Pixi boundary.
 *
 * @public
 * @unofficial
 */
export type InteropPixiText = PixiInterop<'PixiText', PixiText>;
