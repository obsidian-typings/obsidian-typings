import type { Container } from '../internals/Container.d.ts';
import type { PixiInterop } from './PixiInterop.d.ts';

/**
 * The selected Container contract at Obsidian's Pixi boundary.
 *
 * @public
 * @unofficial
 */
export type InteropContainer = PixiInterop<'Container', Container>;
