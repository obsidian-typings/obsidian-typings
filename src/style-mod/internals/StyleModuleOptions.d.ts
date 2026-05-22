/**
 * Options for creating a style module.
 *
 * @public
 * @unofficial
 */
export interface StyleModuleOptions {
  /** A function to post-process generated selectors. */
  finish?(sel: string): string;
}
