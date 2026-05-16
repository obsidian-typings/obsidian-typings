/**
 * Extension values can be provided when creating a state to attach various kinds of configuration
 * and behavior information.
 *
 * @public
 * @unofficial
 */
export type Extension = {
  extension: Extension;
} | readonly Extension[];
