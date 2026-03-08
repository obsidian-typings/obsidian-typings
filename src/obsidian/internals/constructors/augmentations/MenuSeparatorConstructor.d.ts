import type {
    Menu,
    MenuSeparator
} from 'obsidian';
import type { ConstructorBase } from '../ConstructorBase.d.ts';

/**
 * The MenuSeparator constructor.
 *
 * @public
 * @unofficial
 */
export interface MenuSeparatorConstructor extends ConstructorBase<[menu: Menu], MenuSeparator> {}
