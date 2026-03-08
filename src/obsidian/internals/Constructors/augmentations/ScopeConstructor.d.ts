import type { Scope } from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The Scope constructor.
 *
 * @public
 * @unofficial
 */
export interface ScopeConstructor extends ConstructorBase<[parent?: Scope], Scope> {}
