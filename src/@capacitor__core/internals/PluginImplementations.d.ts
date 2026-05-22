import type { ConstructorBase } from '../../obsidian/internals/constructors/ConstructorBase.d.ts';

/**
 * Plugin implementations map.
 *
 * @public
 * @unofficial
 */
export interface PluginImplementations {
  /** Plugin implementation for the given platform. */
  [platform: string]: (() => Promise<ConstructorBase<[], unknown>>) | ConstructorBase<[], unknown>;
}
