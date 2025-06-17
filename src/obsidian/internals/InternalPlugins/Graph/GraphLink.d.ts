import type {
    Container,
    Graphics,
    Sprite
} from 'pixi.js';
import type { GraphNode } from './GraphNode.d.ts';
import type { GraphRenderer } from './GraphRenderer.d.ts';

/**
 * Represents a link in a graph view.
 *
 * @public
 * @unofficial
 */
export interface GraphLink {
    /** PixiJS element for the arrow, child of `GraphRenderer.hanger`. */
    arrow: Graphics | null;

    /** PixiJS element for the line. */
    line: Sprite | null;

    /** Parent of `GraphLink.line`, child of `GraphRenderer.hanger`. */
    px: Container | null;

    /** @todo Documentation incomplete. */
    rendered: boolean;

    /** `GraphRenderer` managing this node. */
    renderer: GraphRenderer;

    /** Source node of the link. */
    source: GraphNode;

    /** Target node of the link. */
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
