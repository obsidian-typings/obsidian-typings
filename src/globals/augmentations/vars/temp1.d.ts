import type { Database } from '../../../obsidian/internals/web-sql/Database.d.ts';

export {};

declare global {
  /**
   * Temporary reference to the WebSQL database `changeVersion` method.
   * @unofficial
   */
  const temp1: Database['changeVersion'];
}
