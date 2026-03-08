import type { Notice } from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The Notice constructor.
 *
 * @public
 * @unofficial
 */
export interface NoticeConstructor extends ConstructorBase<[message: string | DocumentFragment, duration?: number], Notice> {}
