import type {
  Text as PIXIText,
  TextStyle
} from 'pixi.js';

import type { GraphRenderer } from './GraphRenderer.d.ts';

/**
 * Power tag.
 *
 * @public
 * @unofficial
 */
export interface PowerTag {
  /** Whether the power tag graphics have been rendered. */
  rendered: boolean;

  /** Graph renderer managing this power tag. */
  renderer: GraphRenderer;

  /** PixiJS text element displaying the tag label. */
  text: PIXIText;

  /** Destroy the power tag graphics and remove them from the scene. */
  clearGraphics(): void;

  /**
   * Get the text style used for rendering the power tag label.
   *
   * @returns The text style of the power tag.
   */
  getTextStyle(): TextStyle;

  /** Initialize the power tag graphics and add them to the scene. */
  initGraphics(): void;

  /** Render the power tag. */
  render(): void;
}
