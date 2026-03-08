import type { TagValue } from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The TagValue constructor.
 *
 * @public
 * @unofficial
 */
export interface TagValueConstructor extends ConstructorBase<[value: string], TagValue> {}
