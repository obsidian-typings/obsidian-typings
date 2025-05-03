import type {
    Container,
    Graphics
} from 'pixi.js';
import type { GraphNode } from './GraphNode.d.ts';
import type { GraphRenderer } from './GraphRenderer.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface GraphLink {
    /** @todo Documentation incomplete. */
    arrow: Graphics | null;

    /** @todo Documentation incomplete. */
    line: Graphics | null;

    /** @todo Documentation incomplete. */
    px: Container | null;

    /** @todo Documentation incomplete. */
    rendered: boolean;

    /** @todo Documentation incomplete. */
    renderer: GraphRenderer;

    /** @todo Documentation incomplete. */
    source: GraphNode;

    /** @todo Documentation incomplete. */
    target: GraphNode;

    /**
     * Destroy the graphics and its children, and remove them from the scene.
     */
    clearGraphics(): void;

    /**
     * Initialize the link (line and arrow), and add them to the scene.
     */
    initGraphics(): void;
}
