import type { ToggleComponent } from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The ToggleComponent constructor.
 *
 * @public
 * @unofficial
 */
export interface ToggleComponentConstructor extends ConstructorBase<[containerEl: HTMLElement], ToggleComponent> {}
