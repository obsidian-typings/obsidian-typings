import type { TextStyle } from '../internals/TextStyle.d.ts';
import type { PixiInterop } from './PixiInterop.d.ts';

/**
 * The selected TextStyle contract at Obsidian's Pixi boundary.
 *
 * @public
 * @unofficial
 */
export type InteropTextStyle = PixiInterop<'TextStyle', TextStyle>;
