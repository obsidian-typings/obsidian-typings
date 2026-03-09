import {
  UrlValue
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type UrlValueConstructor = ExtractConstructor<UrlValue>;

/**
 * Get the UrlValue constructor.
 *
 * @returns The UrlValue constructor.
 *
 * @public
 * @unofficial
 */
export function getUrlValueConstructor(): UrlValueConstructor {
  return UrlValue as UrlValueConstructor;
}
