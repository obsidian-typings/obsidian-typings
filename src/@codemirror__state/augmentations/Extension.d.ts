import type { Extension } from '@codemirror/state';

export {};

declare module '@codemirror/state' {
  /**
   * Extension values can be provided when creating a state to attach various kinds of
   * configuration and behavior information.
   *
   * @official
   * @deprecated - Added only for typing purposes. Use {@link Extension} instead.
   */
  type Extension__ = { extension: Extension } | readonly Extension[];
}
