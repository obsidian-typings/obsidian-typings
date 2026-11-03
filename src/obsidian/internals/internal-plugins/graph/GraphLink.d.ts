import type { InteropContainer as Container } from '../../../../pixi.js/interop/InteropContainer.d.ts';
import type { InteropGraphics as Graphics } from '../../../../pixi.js/interop/InteropGraphics.d.ts';
import type { InteropSprite as Sprite } from '../../../../pixi.js/interop/InteropSprite.d.ts';
import type { GraphNode } from './GraphNode.d.ts';
import type { GraphRenderer } from './GraphRenderer.d.ts';

/**
 * Represents a link in a graph view.
 *
 * @public
 * @unofficial
 */
export interface GraphLink {
  /**
   * PixiJS element for the arrow, child of {@link GraphRenderer.hanger}.
   */
  arrow: Graphics | null;

  /**
   * PixiJS element for the line.
   */
  line: null | Sprite;

  /**
   * Parent of {@link GraphLink.line}, child of {@link GraphRenderer.hanger}.
   */
  px: Container | null;

  /**
   * Whether the link graphics have been rendered.
   */
  rendered: boolean;

  /**
   * {@link GraphRenderer} managing this node.
   */
  renderer: GraphRenderer;

  /**
   * Source node of the link.
   */
  source: GraphNode;

  /**
   * Target node of the link.
   */
  target: GraphNode;

  /**
   * Destroy the graphics and its children, and remove them from the scene.
   */
  clearGraphics(): void;

  /**
   * Initialize the link (line and arrow), and add them to the scene.
   */
  initGraphics(): void;

  /**
   * Render the link.
   */
  render(): void;
}
