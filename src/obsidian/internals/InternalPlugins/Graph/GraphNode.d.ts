import type {
    Graphics,
    Text,
    TextStyle
} from 'pixi.js';
import type { GraphColorAttributes } from './GraphColorAttributes.d.ts';
import type { GraphRenderer } from './GraphRenderer.d.ts';

/**
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface GraphNode {
    /** @todo Documentation incomplete. */
    circle: Graphics | null;

    /** @todo Documentation incomplete. */
    color: GraphColorAttributes;

    /** @todo Documentation incomplete. */
    forward: Record<string, GraphNode>;

    /** @todo Documentation incomplete. */
    fx: number | null;

    /** @todo Documentation incomplete. */
    fy: number | null;

    /** @todo Documentation incomplete. */
    highlight: Graphics | null;

    /** @todo Documentation incomplete. */
    id: string;

    /** @todo Documentation incomplete. */
    rendered: boolean;

    /** @todo Documentation incomplete. */
    renderer: GraphRenderer;

    /** @todo Documentation incomplete. */
    reverse: Record<string, GraphNode>;

    /** @todo Documentation incomplete. */
    text: Text | null;

    /** @todo Documentation incomplete. */
    type: string;

    /** @todo Documentation incomplete. */
    weight: number;

    /** @todo Documentation incomplete. */
    x: number;

    /** @todo Documentation incomplete. */
    y: number;

    /**
     * Destroy the graphics and its children, and remove them from the scene.
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
     */
    initGraphics(): void;

    /**
     * Render the node.
     */
    render(): void;
}
