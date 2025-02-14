import type { ICanvasRenderingContext2D } from './ICanvasRenderingContext2D.js';
/** @public */
export declare type ContextIds = '2d' | 'bitmaprenderer' | 'webgl' | 'experimental-webgl' | 'webgl2' | 'experimental-webgl2';
/** @public */
export declare type PixiPredefinedColorSpace = 'srgb' | 'display-p3';
/** @public */
export declare type PixiRenderingContext = ICanvasRenderingContext2D | ImageBitmapRenderingContext | WebGLRenderingContext | WebGL2RenderingContext;
/** @public */
export interface ICanvasRenderingContext2DSettings {
    alpha?: boolean;
    colorSpace?: PixiPredefinedColorSpace;
    desynchronized?: boolean;
    willReadFrequently?: boolean;
}
/** @public */
export declare type ContextSettings = ICanvasRenderingContext2DSettings | ImageBitmapRenderingContextSettings | WebGLContextAttributes;
/** @public */
export interface ICanvasParentNode {
    /** Adds a node to the end of the list of children of the parent node. */
    appendChild(element: HTMLElement): void;
    /** Removes a child node from the parent node. */
    removeChild(element: HTMLElement): void;
    removeChild(element: ICanvas): void;
}
/** @public */
export interface ICanvasStyle {
    width?: string;
    height?: string;
    cursor?: string;
    touchAction?: string;
    msTouchAction?: string;
    msContentZooming?: string;
}
/** @public */
export interface ICanvasRect {
    x: number;
    y: number;
    width: number;
    height: number;
}
/** @public */
export interface WebGLContextEventMap {
    'webglcontextlost': WebGLContextEvent;
    'webglcontextrestore': WebGLContextEvent;
}
/**
 * Common interface for HTMLCanvasElement, OffscreenCanvas, and other custom canvas classes.
 * @memberof PIXI
 * @extends GlobalMixins.ICanvas
 * @extends Partial<EventTarget>
 */
/** @public */
export interface ICanvas extends Partial<EventTarget> {
    /** Width of the canvas. */
    width: number;
    /** Height of the canvas. */
    height: number;
    /**
     * Get rendering context of the canvas.
     * @param contextId - The identifier of the type of context to create.
     * @param options - The options for creating context.
     * @returns The created context, or null if contextId is not supported.
     */
    getContext(contextId: '2d', options?: ICanvasRenderingContext2DSettings): ICanvasRenderingContext2D | null;
    getContext(contextId: 'bitmaprenderer', options?: ImageBitmapRenderingContextSettings): ImageBitmapRenderingContext | null;
    getContext(contextId: 'webgl' | 'experimental-webgl', options?: WebGLContextAttributes): WebGLRenderingContext | null;
    getContext(contextId: 'webgl2' | 'experimental-webgl2', options?: WebGLContextAttributes): WebGL2RenderingContext | null;
    getContext(contextId: ContextIds, options?: ContextSettings): PixiRenderingContext | null;
    /**
     * Get the content of the canvas as data URL.
     * @param type - A string indicating the image format. The default type is `image/png`;
     *      that type is also used if the given type isn't supported.
     * @param quality - A number between 0 and 1 indicating the image quality to be used when
     *      creating images using file formats that support lossy compression (such as `image/jpeg` or `image/webp`).
     *      A user agent will use its default quality value if this option is not specified, or if the number
     *      is outside the allowed range.
     * @returns A string containing the requested data URL.
     */
    toDataURL?(type?: string, quality?: number): string;
    /**
     * Creates a Blob from the content of the canvas.
     * @param callback - A callback function with the resulting `Blob` object
     *      as a single argument. `null` may be passed if the image cannot be created for any reason.
     * @param type - A string indicating the image format. The default type is `image/png`;
     *      that type is also used if the given type isn't supported.
     * @param quality - A number between 0 and 1 indicating the image quality to be used when
     *      creating images using file formats that support lossy compression (such as `image/jpeg` or `image/webp`).
     *      A user agent will use its default quality value if this option is not specified, or if the number
     *      is outside the allowed range.
     */
    toBlob?(callback: (blob: Blob | null) => void, type?: string, quality?: number): void;
    /**
     * Get the content of the canvas as Blob.
     * @param options - The options for creating Blob.
     * options.type - A string indicating the image format. The default type is `image/png`;
     *      that type is also used if the given type isn't supported.
     * options.quality - A number between 0 and 1 indicating the image quality to be used when
     *      creating images using file formats that support lossy compression (such as `image/jpeg` or `image/webp`).
     *      A user agent will use its default quality value if this option is not specified, or if the number
     *      is outside the allowed range.
     * @returns A `Promise` returning a Blob object representing the image contained in the canvas.
     */
    convertToBlob?(options?: {
        type?: string;
        quality?: number;
    }): Promise<Blob>;
    /**
     * Adds the listener for the specified event.
     * @param type - The type of event to listen for.
     * @param listener - The callback to invoke when the event is fired.
     * @param options - The options for adding event listener.
     */
    addEventListener?: {
        (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        <K extends keyof WebGLContextEventMap>(type: K, listener: (this: ICanvas, ev: WebGLContextEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    };
    /**
     * Removes the listener for the specified event.
     * @param type - The type of event to listen for.
     * @param listener - The callback to invoke when the event is fired.
     * @param options - The options for removing event listener.
     */
    removeEventListener?: {
        (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
        <K extends keyof WebGLContextEventMap>(type: K, listener: (this: ICanvas, ev: WebGLContextEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    };
    /**
     * Dispatches a event.
     * @param event - The Event object to dispatch. Its Event.target property will be set to the current EventTarget.
     * @returns Returns false if event is cancelable, and at least one of the event handlers which received event
     *                    called Event.preventDefault(). Otherwise true.
     */
    dispatchEvent(event: Event): boolean;
    /** Parent node of the canvas. */
    readonly parentNode?: ICanvasParentNode | null;
    /** Style of the canvas. */
    readonly style?: ICanvasStyle;
    /**
     * Get the position and the size of the canvas.
     * @returns The smallest rectangle which contains the entire canvas.
     */
    getBoundingClientRect?(): ICanvasRect;
}
