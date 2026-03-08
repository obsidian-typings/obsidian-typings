import type { ColorComponent } from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The ColorComponent constructor.
 *
 * @public
 * @unofficial
 */
export interface ColorComponentConstructor extends ConstructorBase<[containerEl: HTMLElement], ColorComponent> {}
