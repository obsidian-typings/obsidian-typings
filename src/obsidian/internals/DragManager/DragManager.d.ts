import type {
    App,
    TAbstractFile,
    TFile,
    TFolder
} from 'obsidian';
import type { Draggable } from './Draggable.d.ts';
import type { DragStartEvent } from './DragStartEvent.d.ts';
import type { DropResult } from './DropResult.d.ts';

/**
 * Manager for drag-and-drop operations throughout the application.
 * @public
 * @unofficial
 */
export interface DragManager {
    /** Element displaying the current drop action label. */
    actionEl: HTMLElement | null;

    /** Reference to the app. */
    app: App;

    /** Currently active draggable item. */
    draggable: Draggable | null;

    /** Information about the initial drag start event. */
    dragStart: DragStartEvent | null;

    /** Ghost element shown while dragging. */
    ghostEl: HTMLElement | null;

    /** CSS class currently applied to the hover target. */
    hoverClass: string;

    /** Element currently being hovered over during drag. */
    hoverEl: HTMLElement | null;

    /** Whether the drag-over event has been handled by a drop target. */
    isDragOverHandled: boolean;

    /** Overlay element shown during drag operations to indicate drop zones. */
    overlayEl: HTMLElement;

    /** Whether the overlay should be hidden on the next update. */
    shouldHideOverlay: boolean;

    /** CSS class applied to the source elements during drag. */
    sourceClass: string;

    /** Elements from which the drag originated. */
    sourceEls: HTMLElement[] | null;

    /** Start a drag operation for a single file. */
    dragFile(event: DragEvent, file: TFile, source?: unknown): Draggable;

    /** Start a drag operation for multiple files. */
    dragFiles(event: DragEvent, files: TAbstractFile[], source?: unknown): Draggable | null;

    /** Start a drag operation for a folder. */
    dragFolder(event: DragEvent, folder: TFolder, source?: unknown): Draggable;

    /** Start a drag operation for a link. */
    dragLink(event: DragEvent, linkText: string, sourcePath: string, title?: string, source?: unknown): Draggable;

    /** Register an element as a drag source with a callback to produce a draggable. */
    handleDrag(el: HTMLElement, draggableGetter: (event: DragEvent) => Draggable | null): void;

    /** Register an element as a drop target with a handler callback. */
    handleDrop(
        el: HTMLElement,
        dropHandler: (event: DragEvent, draggable: Draggable, isOver: boolean) => DropResult | null,
        draggable?: boolean
    ): void;

    /** Hide the drop zone overlay. */
    hideOverlay(): void;

    /** Handle the end of a drag operation, cleaning up state. */
    onDragEnd(): void;

    /** Handle the drag-leave event on a drop target. */
    onDragLeave(event: DragEvent): void;

    /** Handle the drag-over event to update hover state. */
    onDragOver(event: DragEvent): void;

    /** Handle the first drag-over event when entering a drop zone. */
    onDragOverFirst(): void;

    /** Handle the start of a drag operation with a draggable item. */
    onDragStart(event: DragEvent, draggable: Draggable): void;

    /** Handle a global drag start event. */
    onDragStartGlobal(event: DragEvent): void;

    /** Handle touch end event for mobile drag operations. */
    onTouchEnd(event: TouchEvent): void;

    /** Remove the drop zone overlay element from the DOM. */
    removeOverlay(): void;

    /** Set the current drop action label. */
    setAction(action: string | null): void;

    /** Show the drop zone overlay at the specified position. */
    showOverlay(doc: Document, rect: DOMRect): void;

    /** Update the hover target element and its CSS class. */
    updateHover(hoverEl: HTMLElement | null, hoverClass: string): void;

    /** Update the drag source elements and their CSS class. */
    updateSource(sourceEls: HTMLElement[] | null, sourceClass: string): void;
}
