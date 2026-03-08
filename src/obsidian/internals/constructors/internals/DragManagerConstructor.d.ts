import type { App } from 'obsidian';
import type { DragManager } from '../../drag-manager/DragManager.d.ts';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The DragManager constructor.
 *
 * @public
 * @unofficial
 */
export interface DragManagerConstructor extends ConstructorBase<[app: App], DragManager> {}
