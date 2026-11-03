import type { PixiModule } from '../internals/PixiModule.d.ts';
import type { PixiInterop } from './PixiInterop.d.ts';

/**
 * The selected PixiModule contract at Obsidian's Pixi boundary.
 *
 * @public
 * @unofficial
 */
export type InteropPixiModule = PixiInterop<'PixiModule', PixiModule>;
