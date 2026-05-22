import type { Module } from './Module.d.ts';

/**
 * Constructor for an i18next module.
 *
 * @public
 * @unofficial
 */
export interface ModuleConstructor<T extends Module> {
  /** Creates a new module instance. */
  new (): T;
}
