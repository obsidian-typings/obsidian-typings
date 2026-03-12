import type { App } from 'obsidian';

export {};

declare global {
  /**
   * Global reference to the app.
   *
   * @unofficial
   * @deprecated - Prefer not to use this value directly.
   */
  const app: App;
}
