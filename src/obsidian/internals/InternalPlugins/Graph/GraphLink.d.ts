import type {
    Container,
    Graphics
} from 'pixi.js';
import type { GraphNode } from './GraphNode.d.ts';
import type { GraphRenderer } from './GraphRenderer.d.ts';

/**
 * @public
 * @unofficial
 */
export interface GraphLink {
    /** @internal */
    arrow: Graphics | null;
    /** @internal */
    line: Graphics | null;
    /** @internal */
    px: Container | null;
    /** @internal */
    rendered: boolean;
    /** @internal */
    renderer: GraphRenderer;
    /** @internal */
    source: GraphNode;
    /** @internal */
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
