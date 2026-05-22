import type { Module } from './Module.d.ts';

/**
 * Container for loaded i18next plugin modules.
 *
 * @public
 * @unofficial
 */
export interface I18nModules {
  /** External plugin modules. */
  external: Module[];
}
