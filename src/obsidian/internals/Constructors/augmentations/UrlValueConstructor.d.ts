import type { UrlValue } from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The UrlValue constructor.
 *
 * @public
 * @unofficial
 */
export interface UrlValueConstructor extends ConstructorBase<[value: string], UrlValue> {}
