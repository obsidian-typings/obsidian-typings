import type { App } from 'obsidian';
import type { ExtractConstructor } from '../ExtractConstructor.d.ts';

/**
 * The App constructor.
 *
 * @public
 * @unofficial
 */
export type AppConstructor = ExtractConstructor<App>;
