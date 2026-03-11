export {};

declare module 'i18next' {
  /**
   * The language code that i18next is currently transitioning to, or `undefined` if no change is in progress.
   *
   * @unofficial
   */
  export const isLanguageChangingTo2: string | undefined;
}
