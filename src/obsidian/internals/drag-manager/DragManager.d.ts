import type {
  App,
  TAbstractFile,
  TFile,
  TFolder
} from 'obsidian';

import type {
  getDragManagerConstructor
} from '../../implementations/constructors/internals/getDragManagerConstructor.d.ts';
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

  /**
   * Constructor.
   *
   * To get the constructor instance, use {@link getDragManagerConstructor} from `obsidian-typings/implementations`.
   *
   * @param app - The app.
   * @returns The new instance.
   * @deprecated - Added only for typing purposes.
   */
  constructor__(app: App): this;

  /**
   * Start a drag operation for a single file.
   *
   * @param event - The originating drag event.
   * @param file - File to drag.
   * @param source - Source component initiating the drag.
   * @returns The created draggable item.
   */
  dragFile(event: DragEvent, file: TFile, source?: unknown): Draggable;

  /**
   * Start a drag operation for multiple files.
   *
   * @param event - The originating drag event.
   * @param files - Files to drag.
   * @param source - Source component initiating the drag.
   * @returns The created draggable item, or `null`.
   */
  dragFiles(event: DragEvent, files: TAbstractFile[], source?: unknown): Draggable | null;

  /**
   * Start a drag operation for a folder.
   *
   * @param event - The originating drag event.
   * @param folder - Folder to drag.
   * @param source - Source component initiating the drag.
   * @returns The created draggable item.
   */
  dragFolder(event: DragEvent, folder: TFolder, source?: unknown): Draggable;

  /**
   * Start a drag operation for a link.
   *
   * @param event - The originating drag event.
   * @param linkText - Link text to drag.
   * @param sourcePath - Path of the source file for link resolution.
   * @param title - Display title for the drag ghost.
   * @param source - Source component initiating the drag.
   * @returns The created draggable item.
   */
  dragLink(event: DragEvent, linkText: string, sourcePath: string, title?: string, source?: unknown): Draggable;

  /**
   * Register an element as a drag source with a callback to produce a draggable.
   *
   * @param el - Element to register as drag source.
   * @param draggableGetter - Callback returning a draggable on drag start.
   */
  handleDrag(el: HTMLElement, draggableGetter: (event: DragEvent) => Draggable | null): void;

  /**
   * Register an element as a drop target with a handler callback.
   *
   * @param el - Element to register as drop target.
   * @param dropHandler - Callback invoked on drop or drag-over.
   * @param draggable - Whether the element itself is also draggable.
   */
  handleDrop(
    el: HTMLElement,
    dropHandler: (event: DragEvent, draggable: Draggable, isOver: boolean) => DropResult | null,
    draggable?: boolean
  ): void;

  /** Hide the drop zone overlay. */
  hideOverlay(): void;

  /** Handle the end of a drag operation, cleaning up state. */
  onDragEnd(): void;

  /**
   * Handle the drag-leave event on a drop target.
   *
   * @param event - The drag-leave event.
   */
  onDragLeave(event: DragEvent): void;

  /**
   * Handle the drag-over event to update hover state.
   *
   * @param event - The drag-over event.
   */
  onDragOver(event: DragEvent): void;

  /** Handle the first drag-over event when entering a drop zone. */
  onDragOverFirst(): void;

  /**
   * Handle the start of a drag operation with a draggable item.
   *
   * @param event - The drag event.
   * @param draggable - The draggable item being dragged.
   */
  onDragStart(event: DragEvent, draggable: Draggable): void;

  /**
   * Handle a global drag start event.
   *
   * @param event - The drag event.
   */
  onDragStartGlobal(event: DragEvent): void;

  /**
   * Handle touch end event for mobile drag operations.
   *
   * @param event - The touch event.
   */
  onTouchEnd(event: TouchEvent): void;

  /** Remove the drop zone overlay element from the DOM. */
  removeOverlay(): void;

  /**
   * Set the current drop action label.
   *
   * @param action - Action label text, or `null` to clear.
   */
  setAction(action: null | string): void;

  /**
   * Show the drop zone overlay at the specified position.
   *
   * @param doc - Document in which to show the overlay.
   * @param rect - Rectangle defining the overlay position.
   */
  showOverlay(doc: Document, rect: DOMRect): void;

  /**
   * Update the hover target element and its CSS class.
   *
   * @param hoverEl - Element to highlight as hover target, or `null`.
   * @param hoverClass - CSS class to apply to the hover element.
   */
  updateHover(hoverEl: HTMLElement | null, hoverClass: string): void;

  /**
   * Update the drag source elements and their CSS class.
   *
   * @param sourceEls - Source elements, or `null`.
   * @param sourceClass - CSS class to apply to source elements.
   */
  updateSource(sourceEls: HTMLElement[] | null, sourceClass: string): void;
}
