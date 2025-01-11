import { Graphics, Text } from "pixi.js";
import type { GraphColorAttributes } from "./GraphPluginInstanceOptions.js";
import type { GraphRenderer } from "./GraphRenderer.js";


export interface GraphNode {
    /**
     * Destroy the graphics and its children, and remove them from the scene
     * @internal
     */
    clearGraphics(): void;
    /**
     * Initialize the node, text, listeners, and add them to the scene
     * @internal
     */
    initGraphics(): void;

    /**
     * Get the current fill color
     * @returns The color of the node
     */
    getFillColor(): GraphColorAttributes;
    /**
     * Get the current size of the node, after weight and node size multiplier have been applied
     * @returns The size of the node
     */
    getSize(): number;
    /**
     * Get the displayed text associated to the node
     * @returns The displayed text of the node
     */
    getDisplayText(): string;
    /**
     * Get the ids of connected nodes (back and forward links)
     * @returns An array of string ids of connected nodes
     */
    getRelated(): string[];

    /** @internal */
    circle: Graphics;
    /** @internal */
    color: GraphColorAttributes;
    /** @internal */
    forward: Record<string, GraphNode>;
    /** @internal */
    id: string;
    /** @internal */
    rendered: boolean;
    /** @internal */
    renderer: GraphRenderer;
    /** @internal */
    reverse: Record<string, GraphNode>;
    /** @internal */
    text: Text;
    /** @internal */
    type: string;
    /** @internal */
    weight: number;
    /** @internal */
    x: number;
    /** @internal */
    y: number;
}