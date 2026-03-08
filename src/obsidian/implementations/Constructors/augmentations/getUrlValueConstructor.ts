import {
    UrlValue
} from 'obsidian';
import type { UrlValueConstructor } from '../../../internals/Constructors/augmentations/UrlValueConstructor.ts';

/**
 * Get the UrlValue constructor.
 *
 * @returns The UrlValue constructor.
 *
 * @public
 * @unofficial
 */
export function getUrlValueConstructor(): UrlValueConstructor {
    return UrlValue as unknown as UrlValueConstructor;
}
