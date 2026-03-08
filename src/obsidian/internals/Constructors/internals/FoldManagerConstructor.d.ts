import type { App } from 'obsidian';
import type { FoldManager } from '../../FoldManager.d.ts';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The FoldManager constructor.
 *
 * @public
 * @unofficial
 */
export interface FoldManagerConstructor extends ConstructorBase<[app: App], FoldManager> {}
