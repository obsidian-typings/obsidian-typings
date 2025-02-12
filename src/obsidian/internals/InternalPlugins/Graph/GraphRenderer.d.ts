import { Application, Container } from 'pixi.js';
import type { GraphColor } from './GraphColor.js';
import type { GraphColorAttributes } from './GraphColorAttributes.js';
import type { GraphLink } from './GraphLink.js';
import type { GraphNode } from './GraphNode.js';

/** @public */
export interface GraphRenderer {
    /** @internal */
    colors: Record<GraphColor, GraphColorAttributes>;
	/** @internal */
	dragNode: GraphNode | null;
	/** @internal */
	fLineSizeMult: number;
    /** @internal */
    fNodeSizeMult: number;
	/** @internal */
	hanger: Container;
	/** @internal */
	height: number;
    /** @internal */
    idleFrames: number;
    /** @internal */
    interactiveEl: HTMLCanvasElement;
    /** @internal */
    links: GraphLink[];
    /** @internal */
    nodes: GraphNode[];
    /** @internal */
    nodeScale: number;
    /** @internal */
    panX: number;
    /** @internal */
    panY: number;
    /** @internal */
    px: Application;
    /** @internal */
    scale: number;
    /** @internal */
    targetScale: number;
	/** @internal */
	viewport: {bottom: number, left: number, right: number, top: number};
	/** @internal */
	width: number;
    /** @internal */
    worker: Worker;
	/** @internal */
	zoomCenterX: number;
	/** @internal */
	zoomCenterY: number;

    /**
     * Specify that the renderer has changed and needs to be rendered again
     */
    changed(): unknown;
	/** @internal */
	renderCallback(): void;
	/** @internal */
	getHighlightNode(): GraphNode;
	/** @internal */
	setPan(panX: number, panY: number): void;
	/** @internal */
	setScale(scale: number): void;
}
