import type { Application } from '../internals/Application.d.ts';
import type { PixiInterop } from './PixiInterop.d.ts';

/**
 * The selected Application contract at Obsidian's Pixi boundary.
 *
 * @public
 * @unofficial
 */
export type InteropApplication = PixiInterop<'Application', Application>;
