import type {
    ListValue,
    Value
} from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The ListValue constructor.
 *
 * @public
 * @unofficial
 */
export interface ListValueConstructor extends ConstructorBase<[value: (unknown | Value)[]], ListValue> {}
