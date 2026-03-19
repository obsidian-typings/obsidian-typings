import type { PlatformEx } from '../internals/PlatformEx.d.ts';

export {};

declare module 'obsidian' {
  /**
   * Information about the current platform.
   *
   * @official
   * @deprecated - Added only for typing purposes. Use {@link Platform} instead.
   */
  const Platform__: PlatformEx;
}
