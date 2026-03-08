import type { AbstractTextComponent } from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The AbstractTextComponent constructor.
 *
 * @public
 * @unofficial
 */
export interface AbstractTextComponentConstructor extends ConstructorBase<[inputEl: HTMLInputElement | HTMLTextAreaElement], AbstractTextComponent<HTMLInputElement | HTMLTextAreaElement>> {}
