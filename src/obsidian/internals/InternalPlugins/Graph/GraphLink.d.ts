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
    arrow: Graphics | null;
    line: Graphics | null;
    px: Container | null;
    rendered: boolean;
    renderer: GraphRenderer;
    source: GraphNode;
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
