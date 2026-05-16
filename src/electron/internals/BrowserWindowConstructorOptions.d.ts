import type { BrowserWindow } from './BrowserWindow.d.ts';
import type { WebPreferences } from './WebPreferences.d.ts';

/**
 * Options for creating a new BrowserWindow.
 *
 * @public
 * @unofficial
 */
export interface BrowserWindowConstructorOptions {
  /** Whether the window has a frame. */
  frame?: boolean;

  /** The initial height of the window. */
  height?: number;

  /** Whether the window is a modal dialog. */
  modal?: boolean;

  /** The parent window. */
  parent?: BrowserWindow;

  /** Whether the window should be shown when created. */
  show?: boolean;

  /** The title of the window. */
  title?: string;

  /** Web preferences for the window's web content. */
  webPreferences?: WebPreferences;

  /** The initial width of the window. */
  width?: number;

  /** The initial x position of the window. */
  x?: number;

  /** The initial y position of the window. */
  y?: number;
}
