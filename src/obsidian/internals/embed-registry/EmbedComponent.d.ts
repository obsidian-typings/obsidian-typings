import type { Component } from 'obsidian';

/**
 * The component that renders the embedded file.
 *
 * @public
 * @unofficial
 */
export interface EmbedComponent extends Component {
  /**
   * Load the file into the component.
   *
   * Obsidian awaits the returned promise as part of the render, and most built-in embeds load asynchronously.
   *
   * @returns A promise that resolves when the file is loaded, or nothing when it loads synchronously.
   */
  loadFile(): Promise<void> | void;
}
