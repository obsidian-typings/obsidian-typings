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
 * @todo Documentation incomplete
 *
 * @public
 * @unofficial
 */
export interface DragManager {
    /** @todo Documentation incomplete. */
    actionEl: HTMLElement | null;

    /** @todo Documentation incomplete. */
    app: App;

    /** @todo Documentation incomplete. */
    draggable: Draggable | null;

    /** @todo Documentation incomplete. */
    dragStart: DragStartEvent | null;

    /** @todo Documentation incomplete. */
    ghostEl: HTMLElement | null;

    /** @todo Documentation incomplete. */
    hoverClass: string;

    /** @todo Documentation incomplete. */
    hoverEl: HTMLElement | null;

    /** @todo Documentation incomplete. */
    isDragOverHandled: boolean;

    /** @todo Documentation incomplete. */
    overlayEl: HTMLElement;

    /** @todo Documentation incomplete. */
    shouldHideOverlay: boolean;

    /** @todo Documentation incomplete. */
    sourceClass: string;

    /** @todo Documentation incomplete. */
    sourceEls: HTMLElement[] | null;

    /** @todo Documentation incomplete. */
    dragFile(event: DragEvent, file: TFile, source?: unknown): Draggable;

    /** @todo Documentation incomplete. */
    dragFiles(event: DragEvent, files: TAbstractFile[], source?: unknown): Draggable | null;

    /** @todo Documentation incomplete. */
    dragFolder(event: DragEvent, folder: TFolder, source?: unknown): Draggable;

    /** @todo Documentation incomplete. */
    dragLink(event: DragEvent, linkText: string, sourcePath: string, title?: string, source?: unknown): Draggable;

    /** @todo Documentation incomplete. */
    handleDrag(el: HTMLElement, draggableGetter: (event: DragEvent) => Draggable | null): void;

    /** @todo Documentation incomplete. */
    handleDrop(
        el: HTMLElement,
        dropHandler: (event: DragEvent, draggable: Draggable, isOver: boolean) => DropResult | null,
        draggable?: boolean
    ): void;

    /** @todo Documentation incomplete. */
    hideOverlay(): void;

    /** @todo Documentation incomplete. */
    onDragEnd(): void;

    /** @todo Documentation incomplete. */
    onDragLeave(event: DragEvent): void;

    /** @todo Documentation incomplete. */
    onDragOver(event: DragEvent): void;

    /** @todo Documentation incomplete. */
    onDragOverFirst(): void;

    /** @todo Documentation incomplete. */
    onDragStart(event: DragEvent, draggable: Draggable): void;

    /** @todo Documentation incomplete. */
    onDragStartGlobal(event: DragEvent): void;

    /** @todo Documentation incomplete. */
    onTouchEnd(event: TouchEvent): void;

    /** @todo Documentation incomplete. */
    removeOverlay(): void;

    /** @todo Documentation incomplete. */
    setAction(action: string | null): void;

    /** @todo Documentation incomplete. */
    showOverlay(doc: Document, rect: DOMRect): void;

    /** @todo Documentation incomplete. */
    updateHover(hoverEl: HTMLElement | null, hoverClass: string): void;

    /** @todo Documentation incomplete. */
    updateSource(sourceEls: HTMLElement[] | null, sourceClass: string): void;
}
