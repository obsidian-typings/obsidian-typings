import type {
    App,
    Component
} from 'obsidian';
import type { CanvasIndexEntry } from './CanvasIndexEntry.d.ts';

/**
 * @public
 * @unofficial
 */
export interface CanvasIndex extends Component {
    /** @todo Documentation incomplete. */
    app: App;

    /** @todo Documentation incomplete. */
    fileQueue: unknown[];

    /** @todo Documentation incomplete. */
    frame: null;

    /** @todo Documentation incomplete. */
    index: Record<string, CanvasIndexEntry>;

    /** @todo Documentation incomplete. */
    refNodeIds: WeakMap<object, unknown>;

    /** @todo Documentation incomplete. */
    canProcess(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    get(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    getAll(): unknown;

    /** @todo Documentation incomplete. */
    getForPath(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    onCreate(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    onDelete(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    onload(): unknown;

    /** @todo Documentation incomplete. */
    onModify(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    onRename(arg1: unknown, arg2: unknown): unknown;

    /** @todo Documentation incomplete. */
    onunload(): unknown;

    /** @todo Documentation incomplete. */
    parseText(arg1: unknown): Promise<unknown>;

    /** @todo Documentation incomplete. */
    process(arg1: unknown): Promise<unknown>;

    /** @todo Documentation incomplete. */
    queue(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    requestFrame(): unknown;

    /** @todo Documentation incomplete. */
    run(): Promise<unknown>;
}
