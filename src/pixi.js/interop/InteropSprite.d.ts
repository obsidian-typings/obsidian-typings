import type { Sprite } from '../internals/Sprite.d.ts';
import type { PixiInterop } from './PixiInterop.d.ts';

/**
 * The selected Sprite contract at Obsidian's Pixi boundary.
 *
 * @public
 * @unofficial
 */
export type InteropSprite = PixiInterop<'Sprite', Sprite>;
