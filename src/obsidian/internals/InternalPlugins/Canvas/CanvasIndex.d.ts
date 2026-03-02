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

    /** Check whether a file can be processed by the canvas indexer. */
    canProcess(arg1: unknown): unknown;

    /** Get the index entry for the specified file. */
    get(arg1: unknown): unknown;

    /** Get all index entries. */
    getAll(): unknown;

    /** Get the index entry for the specified file path. */
    getForPath(arg1: unknown): unknown;

    /** Handle a file creation event. */
    onCreate(arg1: unknown): unknown;

    /** Handle a file deletion event. */
    onDelete(arg1: unknown): unknown;

    /** Initialize the index when the component loads. */
    onload(): unknown;

    /** Handle a file modification event. */
    onModify(arg1: unknown): unknown;

    /** Handle a file rename event. */
    onRename(arg1: unknown, arg2: unknown): unknown;

    /** Clean up the index when the component unloads. */
    onunload(): unknown;

    /** Parse canvas text content and extract metadata. */
    parseText(arg1: unknown): Promise<unknown>;

    /** Process a single canvas file and update the index. */
    process(arg1: unknown): Promise<unknown>;

    /** Add a file to the processing queue. */
    queue(arg1: unknown): unknown;

    /** Request an animation frame to process queued files. */
    requestFrame(): unknown;

    /** Run the indexer to process all queued files. */
    run(): Promise<unknown>;
}
