import type { ButtonComponent } from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The ButtonComponent constructor.
 *
 * @public
 * @unofficial
 */
export interface ButtonComponentConstructor extends ConstructorBase<[containerEl: HTMLElement], ButtonComponent> {}
