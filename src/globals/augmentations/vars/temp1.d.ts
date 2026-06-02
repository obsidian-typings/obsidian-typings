import type { Database } from '../../../web-sql/internals/Database.d.ts';

export {};

declare global {
  /**
   * Temporary reference to the WebSQL database `changeVersion` method.
   *
   * @unofficial
   */
  var temp1: Database['changeVersion'];
}
