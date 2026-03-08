import type { LinkValue } from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The LinkValue constructor.
 *
 * @public
 * @unofficial
 */
export interface LinkValueConstructor extends ConstructorBase<[value: string], LinkValue> {}
