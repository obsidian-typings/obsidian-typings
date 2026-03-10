import {
  MenuSeparator
} from 'obsidian';
import type { ExtractConstructor } from '../../../internals/constructors/ExtractConstructor.d.ts';

/**
 * Get the MenuSeparator constructor.
 *
 * @returns The MenuSeparator constructor.
 *
 * @public
 * @unofficial
 */
export function getMenuSeparatorConstructor(): ExtractConstructor<MenuSeparator> {
  return MenuSeparator as ExtractConstructor<MenuSeparator>;
}
