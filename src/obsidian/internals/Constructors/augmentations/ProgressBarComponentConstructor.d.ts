import type { ProgressBarComponent } from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The ProgressBarComponent constructor.
 *
 * @public
 * @unofficial
 */
export interface ProgressBarComponentConstructor extends ConstructorBase<[containerEl: HTMLElement], ProgressBarComponent> {}
