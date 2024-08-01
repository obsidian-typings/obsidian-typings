import type {
    App,
    TAbstractFile,
    TFile,
    TFolder
} from "obsidian";
import type {
    Draggable,
    DragStartEvent,
    DropResult
} from "./index.js";
/** @todo Documentation incomplete */
export interface DragManager {
    actionEl: HTMLElement | null;
    app: App;
    dragStart: DragStartEvent | null;
    draggable: Draggable | null;
    ghostEl: HTMLElement | null;
    hoverClass: string;
    hoverEl: HTMLElement | null;
    isDragOverHandled: boolean;
    overlayEl: HTMLElement;
    shouldHideOverlay: boolean;
    sourceClass: string;
    sourceEls: HTMLElement[] | null;

    dragFile(event: DragEvent, file: TFile, source?: unknown): Draggable;
    dragFiles(event: DragEvent, files: TAbstractFile[], source?: unknown): Draggable | null;
    dragFolder(event: DragEvent, folder: TFolder, source?: unknown): Draggable;
    dragLink(event: DragEvent, linkText: string, sourcePath: string, title?: string, source?: unknown): Draggable;
    handleDrag(el: HTMLElement, draggableGetter: (event: DragEvent) => Draggable | null): void;
    handleDrop(
        el: HTMLElement,
        dropHandler: (event: DragEvent, draggable: Draggable, isOver: boolean) => DropResult | null,
        draggable?: boolean
    ): void;
    hideOverlay(): void;
    onDragEnd(): void;
    onDragLeave(event: DragEvent): void;
    onDragOver(event: DragEvent): void;
    onDragOverFirst(): void;
    onDragStart(event: DragEvent, draggable: Draggable): void;
    onDragStartGlobal(event: DragEvent): void;
    onTouchEnd(event: TouchEvent): void;
    removeOverlay(): void;
    setAction(action: string | null): void;
    showOverlay(doc: Document, rect: DOMRect): void;
    updateHover(hoverEl: HTMLElement | null, hoverClass: string): void;
    updateSource(sourceEls: HTMLElement[] | null, sourceClass: string): void;
}
