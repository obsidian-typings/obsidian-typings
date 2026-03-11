import type { default as i18nextInstance } from 'i18next';

export {};

declare global {
  /**
   * Minified reference to `Object.defineProperty`.
   * @unofficial
   */
  const i18next: typeof i18nextInstance;
}
