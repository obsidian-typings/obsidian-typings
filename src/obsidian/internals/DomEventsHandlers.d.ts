import type { DomEventsHandlersInfo } from './DomEventsHandlersInfo.d.ts';

/**
 * The handlers for the DOM events.
 *
 * @public
 * @unofficial
 */
export interface DomEventsHandlers {
  /**
   * Constructor.
   *
   * To get the constructor instance, use `getDomEventsHandlersConstructor` from `obsidian-dev-utils/obsidian/constructors/getDomEventsHandlersConstructor`.
   *
   * @param info - The info.
   * @returns The new instance.
   * @deprecated - Added only for typing purposes.
   */
  constructor__(info: DomEventsHandlersInfo): this;

  /**
   * Handles the external link click event.
   *
   * @param evt - The mouse event.
   * @param targetEl - The target element.
   * @param linkText - The link text.
   * @returns The result of handling the click.
   */
  onExternalLinkClick(evt: MouseEvent, targetEl: HTMLElement, linkText: string): unknown;

  /**
   * Handles the external link right click event.
   *
   * @param evt - The mouse event.
   * @param targetEl - The target element.
   * @param linkText - The link text.
   * @returns The result of handling the right click.
   */
  onExternalLinkRightClick(evt: MouseEvent, targetEl: HTMLElement, linkText: string): unknown;

  /**
   * Handles the internal link click event.
   *
   * @param evt - The mouse event.
   * @param targetEl - The target element.
   * @param linkText - The link text.
   * @returns The result of handling the click.
   */
  onInternalLinkClick(evt: MouseEvent, targetEl: HTMLElement, linkText: string): unknown;

  /**
   * Handles the internal link drag event.
   *
   * @param evt - The mouse event.
   * @param targetEl - The target element.
   * @param linkText - The link text.
   * @param title - The title.
   * @returns The result of handling the drag.
   */
  onInternalLinkDrag(evt: MouseEvent, targetEl: HTMLElement, linkText: string, title?: string): unknown;

  /**
   * Handles the internal link mouseover event.
   *
   * @param evt - The mouse event.
   * @param targetEl - The target element.
   * @param linkText - The link text.
   * @returns The result of handling the mouseover.
   */
  onInternalLinkMouseover(evt: MouseEvent, targetEl: HTMLElement, linkText: string): unknown;

  /**
   * Handles the internal link right click event.
   *
   * @param evt - The mouse event.
   * @param targetEl - The target element.
   * @param linkText - The link text.
   * @returns The result of handling the right click.
   */
  onInternalLinkRightClick(evt: MouseEvent, targetEl: HTMLElement, linkText: string): unknown;

  /**
   * Handles the tag click event.
   *
   * @param evt - The mouse event.
   * @param targetEl - The target element.
   * @param tag - The tag text.
   * @returns The result of handling the tag click.
   */
  onTagClick(evt: MouseEvent, targetEl: HTMLElement, tag: string): unknown;
}
