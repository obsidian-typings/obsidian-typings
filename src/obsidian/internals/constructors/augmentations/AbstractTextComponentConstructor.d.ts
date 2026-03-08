import type { AbstractTextComponent } from 'obsidian';
import type { ExtractConstructor } from '../ExtractConstructor.d.ts';

/**
 * The AbstractTextComponent constructor.
 *
 * @public
 * @unofficial
 */
export type AbstractTextComponentConstructor = ExtractConstructor<AbstractTextComponent<HTMLInputElement | HTMLTextAreaElement>>;
