import type { TextAreaComponent } from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The TextAreaComponent constructor.
 *
 * @public
 * @unofficial
 */
export interface TextAreaComponentConstructor extends ConstructorBase<[containerEl: HTMLElement], TextAreaComponent> {}
