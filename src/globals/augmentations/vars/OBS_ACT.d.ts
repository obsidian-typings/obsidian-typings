import type { ObsidianProtocolHandler } from 'obsidian';

export {};

declare global {
  /**
   * Invoke obsidian protocol action.
   *
   * @unofficial
   */
  const OBS_ACT__: ObsidianProtocolHandler;
}
