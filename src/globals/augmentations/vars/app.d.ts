export {};
import type { App } from 'obsidian';

declare global {
  /**
   * Global reference to the app.
   *
   * @unofficial
   * @deprecated - Prefer not to use this value directly.
   */
  const app: App;
}
