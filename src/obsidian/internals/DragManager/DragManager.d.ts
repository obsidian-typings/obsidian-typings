import type {
    App,
    TAbstractFile,
    TFile,
    TFolder
} from 'obsidian';
import type { Draggable } from './Draggable.d.ts';
import type { DragStartEvent } from './DragStartEvent.d.ts';
import type { DropResult } from './DropResult.d.ts';

/** @todo Documentation incomplete */
/** @public */
export interface DragManager {
    actionEl: HTMLElement | null;
    app: App;
    draggable: Draggable | null;
    dragStart: DragStartEvent | null;
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
