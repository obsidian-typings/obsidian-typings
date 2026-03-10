import type { App } from 'obsidian';

import type { getStatusBarConstructor } from '../implementations/constructors/internals/getStatusBarConstructor.d.ts';

/**
 * The status bar displayed at the bottom of the application window.
 * @public
 * @unofficial
 */
export interface StatusBar {
  /** Reference to the app. */
  app: App;

  /** Container element for the status bar. */
  containerEl: HTMLElement;

  /**
   * Constructor.
   *
   * To get the constructor instance, use {@link getStatusBarConstructor} from `obsidian-typings/implementations`.
   *
   * @param app - The app.
   * @param containerEl - The containerEl.
   * @returns The new instance.
   * @deprecated - Added only for typing purposes.
   */
  constructor__(app: App, containerEl: HTMLElement): this;

  /**
   * Register a new status bar item element.
   *
   * @returns The newly created status bar item element.
   */
  registerStatusBarItem(): HTMLElement;
}
