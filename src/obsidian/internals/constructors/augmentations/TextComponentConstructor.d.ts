import type { TextComponent } from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The TextComponent constructor.
 *
 * @public
 * @unofficial
 */
export interface TextComponentConstructor extends ConstructorBase<[containerEl: HTMLElement], TextComponent> {}
