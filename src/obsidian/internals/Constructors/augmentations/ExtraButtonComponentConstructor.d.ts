import type { ExtraButtonComponent } from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The ExtraButtonComponent constructor.
 *
 * @public
 * @unofficial
 */
export interface ExtraButtonComponentConstructor extends ConstructorBase<[containerEl: HTMLElement], ExtraButtonComponent> {}
