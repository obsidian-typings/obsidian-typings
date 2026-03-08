import type { MenuItem } from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The MenuItem constructor.
 *
 * @public
 * @unofficial
 */
export interface MenuItemConstructor extends ConstructorBase<[menu: unknown], MenuItem> {}
