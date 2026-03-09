import {
  MenuSeparator
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

type MenuSeparatorConstructor = ExtractConstructor<MenuSeparator>;

/**
 * Get the MenuSeparator constructor.
 *
 * @returns The MenuSeparator constructor.
 *
 * @public
 * @unofficial
 */
export function getMenuSeparatorConstructor(): MenuSeparatorConstructor {
  return MenuSeparator as MenuSeparatorConstructor;
}
