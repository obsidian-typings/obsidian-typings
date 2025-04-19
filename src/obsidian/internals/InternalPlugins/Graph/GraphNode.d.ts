import type {
    Graphics,
    Text,
    TextStyle
} from 'pixi.js';
import type { GraphColorAttributes } from './GraphColorAttributes.d.ts';
import type { GraphRenderer } from './GraphRenderer.d.ts';

/** @public @unofficial */
export interface GraphNode {
    /** @internal */
    circle: Graphics | null;
    /** @internal */
    color: GraphColorAttributes;
    /** @internal */
    forward: Record<string, GraphNode>;
    /** @internal */
    fx: number | null;
    /** @internal */
    fy: number | null;
    /** @internal */
    highlight: Graphics | null;
    /** @internal */
    id: string;
    /** @internal */
    rendered: boolean;
    /** @internal */
    renderer: GraphRenderer;
    /** @internal */
    reverse: Record<string, GraphNode>;
    /** @internal */
    text: Text | null;
    /** @internal */
    type: string;
    /** @internal */
    weight: number;
    /** @internal */
    x: number;
    /** @internal */
    y: number;

    /**
     * Destroy the graphics and its children, and remove them from the scene.
     * @internal.
     */
    clearGraphics(): void;
    /**
     * Get the displayed text associated to the node.
     * @returns The displayed text of the node.
     */
    getDisplayText(): string;
    /**
     * Get the current fill color.
     * @returns The color of the node.
     */
    getFillColor(): GraphColorAttributes;
    /**
     * Get the ids of connected nodes (back and forward links).
     * @returns An array of string ids of connected nodes.
     */
    getRelated(): string[];
    /**
     * Get the current size of the node, after weight and node size multiplier have been applied.
     * @returns The size of the node.
     */
    getSize(): number;
    /**
     * Get the text style of the node.
     *
     * @returns The text style of the node.
     */
    getTextStyle(): TextStyle;
    /**
     * Initialize the node, text, listeners, and add them to the scene.
     * @internal.
     */
    initGraphics(): void;
    /**
     * Render the node.
     */
    render(): void;
}
