import type { App } from 'obsidian';

import type {
  getFoldManagerConstructor
} from '../implementations/constructors/internals/getFoldManagerConstructor.d.ts';

/**
 * Manager for persisting and restoring editor fold states.
 * @public
 * @unofficial
 */
export interface FoldManager {
  /** Reference to the app. */
  app: App;

  /**
   * Remove stale fold data from the cache.
   *
   * @returns The result of the cleanup operation.
   * To get the constructor instance, use {@link getFoldManagerConstructor} from `obsidian-typings/implementations`.
   */
  cleanup(): unknown;

  /**
   * Constructor.
   *
   * To get the constructor instance, use {@link getFoldManagerConstructor} from `obsidian-typings/implementations`.
   *
   * @param app - The app.
   * @returns The new instance.
   * @deprecated - Added only for typing purposes.
   */
  constructor__(app: App): this;

  /**
   * Load fold state for the given file or view.
   *
   * @returns The loaded fold state.
   */
  load(arg1: unknown): unknown;

  /**
   * Load fold state from a specific path.
   *
   * @returns The loaded fold state.
   */
  loadPath(arg1: unknown): unknown;

  /**
   * Save fold state for the given file or view.
   *
   * @returns The result of the save operation.
   */
  save(arg1: unknown, arg2: unknown): unknown;

  /**
   * Save fold state to a specific path.
   *
   * @returns The result of the save operation.
   */
  savePath(arg1: unknown, arg2: unknown): unknown;
}
