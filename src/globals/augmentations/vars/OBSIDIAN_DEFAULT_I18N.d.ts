import type { Localization } from '../../../obsidian/internals/Localization.d.ts';

export {};

declare global {
  /**
   * Default internationalization strings bundled with Obsidian.
   * @unofficial
   */
  const OBSIDIAN_DEFAULT_I18N: Localization;
}
