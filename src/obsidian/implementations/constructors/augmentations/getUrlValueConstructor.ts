import {
    UrlValue
} from 'obsidian';
import type { UrlValueConstructor } from '../../../internals/constructors/augmentations/UrlValueConstructor.d.ts';

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
