import {
  UrlValue
} from 'obsidian';
import type { ExtractConstructor } from '../../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the UrlValue constructor.
 *
 * @returns The UrlValue constructor.
 *
 * @public
 * @unofficial
 */
export function getUrlValueConstructor(): ExtractConstructor<UrlValue> {
  return UrlValue as ExtractConstructor<UrlValue>;
}
