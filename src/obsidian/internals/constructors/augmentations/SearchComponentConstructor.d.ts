import type { SearchComponent } from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The SearchComponent constructor.
 *
 * @public
 * @unofficial
 */
export interface SearchComponentConstructor extends ConstructorBase<[containerEl: HTMLElement], SearchComponent> {}
