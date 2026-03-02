import type {
    App,
    Component
} from 'obsidian';
import type { CanvasIndexEntry } from './CanvasIndexEntry.d.ts';

/**
 * Index that tracks and resolves links, embeds, and metadata across all canvas files.
 * @public
 * @unofficial
 */
export interface CanvasIndex extends Component {
    /** Reference to the Obsidian app instance. */
    app: App;

    /** Queue of files waiting to be processed by the indexer. */
    fileQueue: unknown[];

    /** Current animation frame request, or null when idle. */
    frame: null;

    /** Index of canvas entries keyed by file path. */
    index: Record<string, CanvasIndexEntry>;

    /** Weak map tracking reference node IDs for canvas files. */
    refNodeIds: WeakMap<object, unknown>;

    /**
     * Check whether a file can be processed by the canvas indexer.
     *
     * @returns Whether the file can be processed.
     */
    canProcess(arg1: unknown): unknown;

    /**
     * Get the index entry for the specified file.
     *
     * @returns The index entry.
     */
    get(arg1: unknown): unknown;

    /**
     * Get all index entries.
     *
     * @returns All index entries.
     */
    getAll(): unknown;

    /**
     * Get the index entry for the specified file path.
     *
     * @returns The index entry.
     */
    getForPath(arg1: unknown): unknown;

    /**
     * Handle a file creation event.
     *
     * @returns The result of handling the creation.
     */
    onCreate(arg1: unknown): unknown;

    /**
     * Handle a file deletion event.
     *
     * @returns The result of handling the deletion.
     */
    onDelete(arg1: unknown): unknown;

    /**
     * Initialize the index when the component loads.
     *
     * @returns The result of loading the index.
     */
    onload(): unknown;

    /**
     * Handle a file modification event.
     *
     * @returns The result of handling the modification.
     */
    onModify(arg1: unknown): unknown;

    /**
     * Handle a file rename event.
     *
     * @returns The result of handling the rename.
     */
    onRename(arg1: unknown, arg2: unknown): unknown;

    /**
     * Clean up the index when the component unloads.
     *
     * @returns The result of unloading the index.
     */
    onunload(): unknown;

    /**
     * Parse canvas text content and extract metadata.
     *
     * @returns The parsed metadata.
     */
    parseText(arg1: unknown): Promise<unknown>;

    /**
     * Process a single canvas file and update the index.
     *
     * @returns The result of processing the file.
     */
    process(arg1: unknown): Promise<unknown>;

    /**
     * Add a file to the processing queue.
     *
     * @returns The result of queuing the file.
     */
    queue(arg1: unknown): unknown;

    /**
     * Request an animation frame to process queued files.
     *
     * @returns The result of requesting the frame.
     */
    requestFrame(): unknown;

    /**
     * Run the indexer to process all queued files.
     *
     * @returns The result of running the indexer.
     */
    run(): Promise<unknown>;
}
