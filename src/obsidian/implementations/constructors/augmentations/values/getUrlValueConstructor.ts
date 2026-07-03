import { UrlValue } from 'obsidian';

import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the {@link obsidian#UrlValue} constructor.
 *
 * @returns The {@link obsidian#UrlValue} constructor.
 *
 * @public
 * @unofficial
 */
export function getUrlValueConstructor(): ExtractConstructor<UrlValue> {
  return UrlValue as ExtractConstructor<UrlValue>;
}
