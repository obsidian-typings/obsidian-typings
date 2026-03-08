import type {
    Menu,
    MenuItem
} from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The MenuItem constructor.
 *
 * @public
 * @unofficial
 */
export interface MenuItemConstructor extends ConstructorBase<[menu: Menu], MenuItem> {}
