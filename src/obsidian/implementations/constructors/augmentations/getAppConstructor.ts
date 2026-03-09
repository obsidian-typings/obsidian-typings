import {
  App
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type AppConstructor = ExtractConstructor<App>;

/**
 * Get the App constructor.
 *
 * @returns The App constructor.
 *
 * @public
 * @unofficial
 */
export function getAppConstructor(): AppConstructor {
  return App as AppConstructor;
}
