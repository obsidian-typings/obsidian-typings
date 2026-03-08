import type { DropdownComponent } from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The DropdownComponent constructor.
 *
 * @public
 * @unofficial
 */
export interface DropdownComponentConstructor extends ConstructorBase<[containerEl: HTMLElement], DropdownComponent> {}
