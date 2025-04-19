import type {
    App,
    Component
} from 'obsidian';
import type { CanvasIndexEntry } from './CanvasIndexEntry.d.ts';

/** @public @unofficial */
export interface CanvasIndex extends Component {
    app: App;
    fileQueue: unknown[];
    frame: null;
    index: Record<string, CanvasIndexEntry>;
    refNodeIds: WeakMap<object, unknown>;

    canProcess(arg1: unknown): unknown;
    get(arg1: unknown): unknown;
    getAll(): unknown;
    getForPath(arg1: unknown): unknown;
    onCreate(arg1: unknown): unknown;
    onDelete(arg1: unknown): unknown;
    onload(): unknown;
    onModify(arg1: unknown): unknown;
    onRename(arg1: unknown, arg2: unknown): unknown;
    onunload(): unknown;
    parseText(arg1: unknown): Promise<unknown>;
    process(arg1: unknown): Promise<unknown>;
    queue(arg1: unknown): unknown;
    requestFrame(): unknown;
    run(): Promise<unknown>;
}
