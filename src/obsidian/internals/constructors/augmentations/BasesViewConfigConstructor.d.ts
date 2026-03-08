import type { BasesViewConfig } from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The BasesViewConfig constructor.
 *
 * @public
 * @unofficial
 */
export interface BasesViewConfigConstructor extends ConstructorBase<[query: string, type: string, name: string], BasesViewConfig> {}
