import type {
    App,
    TFile
} from 'obsidian';
import type { WidgetEditorView } from '../../WidgetEditorView.d.ts';
import type { BBox } from './BBox.d.ts';
import type { CanvasViewCanvas } from './CanvasViewCanvas.d.ts';
import type { CanvasViewCanvasNodeBase } from './CanvasViewCanvasNodeBase.d.ts';
import type { CanvasViewCanvasNodeUnknownData } from './CanvasViewCanvasNodeUnknownData.d.ts';

/**
 * @todo Documentation incomplete.
 * @public
 * @unofficial
 */
export interface CanvasViewCanvasNode extends CanvasViewCanvasNodeBase {
    /** @todo Documentation incomplete. */
    alwaysKeepLoaded: boolean;

    /** @todo Documentation incomplete. */
    app: App;

    /** @todo Documentation incomplete. */
    aspectRatio: number;

    /** @todo Documentation incomplete. */
    bbox: BBox;

    /** @todo Documentation incomplete. */
    canvas: CanvasViewCanvas;

    /** @todo Documentation incomplete. */
    child: WidgetEditorView;

    /** @todo Documentation incomplete. */
    color: string;

    /** @todo Documentation incomplete. */
    containerEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    contentBlockerEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    contentEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    destroyed: boolean;

    /** @todo Documentation incomplete. */
    file: TFile;

    /** @todo Documentation incomplete. */
    filePath: string;

    /** @todo Documentation incomplete. */
    height: number;

    /** @todo Documentation incomplete. */
    id: string;

    /** @todo Documentation incomplete. */
    initialized: boolean;

    /** @todo Documentation incomplete. */
    isContentMounted: boolean;

    /** @todo Documentation incomplete. */
    isEditing: boolean;

    /** @todo Documentation incomplete. */
    nodeEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    placeholderEl: HTMLDivElement;

    /** @todo Documentation incomplete. */
    renderedZIndex: number;

    /** @todo Documentation incomplete. */
    resizeDirty: boolean;

    /** @todo Documentation incomplete. */
    subpath: string;

    /** @todo Documentation incomplete. */
    unknownData: CanvasViewCanvasNodeUnknownData;

    /** @todo Documentation incomplete. */
    width: number;

    /** @todo Documentation incomplete. */
    x: number;

    /** @todo Documentation incomplete. */
    y: number;

    /** @todo Documentation incomplete. */
    zIndex: number;

    /** @todo Documentation incomplete. */
    blur(): unknown;

    /** @todo Documentation incomplete. */
    focus(): unknown;

    /** @todo Documentation incomplete. */
    getData(): unknown;

    /** @todo Documentation incomplete. */
    initFile(): unknown;

    /** @todo Documentation incomplete. */
    initialize(): unknown;

    /** @todo Documentation incomplete. */
    onFileFocus(): unknown;

    /** @todo Documentation incomplete. */
    onLabelClick(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    onLabelDblClick(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    onPointerdown(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    render(): unknown;

    /** @todo Documentation incomplete. */
    setData(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    setFile(arg1: unknown, arg2: unknown, arg3: unknown): unknown;

    /** @todo Documentation incomplete. */
    setFilePath(arg1: unknown, arg2: unknown): unknown;

    /** @todo Documentation incomplete. */
    showMenu(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    updateBreakpoint(arg1: unknown): unknown;

    /** @todo Documentation incomplete. */
    updateNodeLabel(arg1: unknown): unknown;
}
