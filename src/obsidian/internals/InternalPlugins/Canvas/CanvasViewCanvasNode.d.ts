import type {
    App,
    TFile
} from 'obsidian';
import type { WidgetEditorView } from '../../WidgetEditorView.d.ts';
import type { BBox } from './BBox.d.ts';
import type { CanvasViewCanvas } from './CanvasViewCanvas.d.ts';
import type { CanvasViewCanvasNodeBase } from './CanvasViewCanvasNodeBase.d.ts';
import type { CanvasViewCanvasNodeUnknownData } from './CanvasViewCanvasNodeUnknownData.d.ts';

/** @public */
export interface CanvasViewCanvasNode extends CanvasViewCanvasNodeBase {
    alwaysKeepLoaded: boolean;
    app: App;
    aspectRatio: number;
    bbox: BBox;
    canvas: CanvasViewCanvas;
    child: WidgetEditorView;
    color: string;
    containerEl: HTMLDivElement;
    contentBlockerEl: HTMLDivElement;
    contentEl: HTMLDivElement;
    destroyed: boolean;
    file: TFile;
    filePath: string;
    height: number;
    id: string;
    initialized: boolean;
    isContentMounted: boolean;
    isEditing: boolean;
    nodeEl: HTMLDivElement;
    placeholderEl: HTMLDivElement;
    renderedZIndex: number;
    resizeDirty: boolean;
    subpath: string;
    unknownData: CanvasViewCanvasNodeUnknownData;
    width: number;
    x: number;
    y: number;
    zIndex: number;

    blur(): unknown;
    focus(): unknown;
    getData(): unknown;
    initFile(): unknown;
    initialize(): unknown;
    onFileFocus(): unknown;
    onLabelClick(arg1: unknown): unknown;
    onLabelDblClick(arg1: unknown): unknown;
    onPointerdown(arg1: unknown): unknown;
    render(): unknown;
    setData(arg1: unknown): unknown;
    setFile(arg1: unknown, arg2: unknown, arg3: unknown): unknown;
    setFilePath(arg1: unknown, arg2: unknown): unknown;
    showMenu(arg1: unknown): unknown;
    updateBreakpoint(arg1: unknown): unknown;
    updateNodeLabel(arg1: unknown): unknown;
}
