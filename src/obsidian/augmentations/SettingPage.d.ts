export {};

declare module 'obsidian' {
  /**
   * Base class for sub-pages of a {@link SettingTab}.
   *
   * @since 1.13.0
   */
  interface SettingPage {
    /**
     * Container for the page's content. Render into this element from
     * {@link display}.
     *
     * @official
     * @since 1.13.0
     */
    containerEl: HTMLElement;

    /**
     * The root element of the page.
     *
     * @official
     * @since 1.13.0
     */
    rootEl: HTMLElement;

    /**
     * Title displayed in the page titlebar.
     *
     * @official
     * @since 1.13.0
     */
    title: string;

    /**
     * The titlebar element of the page.
     *
     * @official
     * @since 1.13.0
     */
    titlebarEl: HTMLElement;

    /**
     * Hides the contents of the page. Any registered components should be
     * unloaded when the page is hidden. Override this if you need to perform
     * additional cleanup.
     *
     * Called when the user navigates away, the containing tab is switched, or
     * the settings modal is closed. Not guaranteed to run when the host window
     * is destroyed.
     *
     * @official
     * @since 1.13.0
     */
    hide(): void;
  }
}
