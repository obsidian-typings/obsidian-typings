import type {
    Graphics,
    Text,
    TextStyle
} from 'pixi.js';
import type { GraphColorAttributes } from './GraphColorAttributes.d.ts';
import type { GraphLink } from './GraphLink.js';
import type { GraphRenderer } from './GraphRenderer.d.ts';

/**
 * Represents a node in the graph view.
 *
 * @public
 * @unofficial
 */
export interface GraphNode {
    /** PixiJS element for the circle, child of `GraphRenderer.hanger`. */
    circle: Graphics | null;

    /** Computed color for the node. */
    color: GraphColorAttributes;

    /** @todo Documentation incomplete. */
    fadeAlpha: number;

    /** Indicates if the text needs to be re-rendered when the node is rendered. */
    fontDirty: boolean;

    /** Record of forward links. Keys are the id of the neighbor nodes. */
    forward: Record<string, GraphLink>;

    /** Forced x position when the node is dragged. */
    fx: number | null;

    /** Forced y position when the node is dragged. */
    fy: number | null;

    /** Colored circle added if the node is highlighted, child of `GraphNode.circle`. */
    highlight: Graphics | null;

    /** ID of the node (path, tag, or name for non-existing files). */
    id: string;

    /** Displacement of the text, changed when the node is hovered */
    moveText: number;

    /** @todo Documentation incomplete. */
    rendered: boolean;

    /** `GraphRenderer` managing this node */
    renderer: GraphRenderer;

    /** Record of backward links. Keys are the id of the neighbor nodes. */
    reverse: Record<string, GraphLink>;

    /** PixiJS element for the name, child of `GraphNode.circle`. */
    text: Text | null;

    /** Type of the node, can be of value `"tag"`, `"unresolved"`, `"attachment"`, or an empty string for markdown nodes. */
    type: string;

    /** Weight of the node depending on the number of related nodes (forwards and backward). */
    weight: number;

    /** X-axis position of the node in the graph */
    x: number;

    /** Y-axis position of the node in the graph */
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
     * Method called when the node (circle) is clicked, trigger the context menu if it's a right click
     */
    onClick(e: MouseEvent): void;

    /**
     * Render the node.
     */
    render(): void;
}
