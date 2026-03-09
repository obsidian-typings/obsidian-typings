import type { App } from 'obsidian';
import type { BasesControl } from './BasesControl.d.ts';

/**
 * Bases link.
 *
 * @public
 * @unofficial
 */
export interface BasesLink extends BasesControl {
  /**
   * The link.
   */
  link: string;

  /**
   * Constructor.
   *
   * @param app - The app instance.
   * @param linkText - The link text.
   * @param sourcePath - The source path.
   * @param displayText - The display text.
   * @returns The new instance.
   * @deprecated - Added only for typing purposes.
   */
  constructor__(app: App, linkText: string, sourcePath: string, displayText: string): this;
}
