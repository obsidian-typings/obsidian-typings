import type { SliderComponent } from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The SliderComponent constructor.
 *
 * @public
 * @unofficial
 */
export interface SliderComponentConstructor extends ConstructorBase<[containerEl: HTMLElement], SliderComponent> {}
