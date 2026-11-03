import type { Graphics } from '../internals/Graphics.d.ts';
import type { PixiInterop } from './PixiInterop.d.ts';

/**
 * The selected Graphics contract at Obsidian's Pixi boundary.
 *
 * @public
 * @unofficial
 */
export type InteropGraphics = PixiInterop<'Graphics', Graphics>;
