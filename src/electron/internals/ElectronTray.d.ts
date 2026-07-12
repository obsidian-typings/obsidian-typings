import type { ElectronDisplayBalloonOptions } from './ElectronDisplayBalloonOptions.d.ts';
import type { ElectronEvent } from './ElectronEvent.d.ts';
import type { ElectronKeyboardEvent } from './ElectronKeyboardEvent.d.ts';
import type { ElectronMenu } from './ElectronMenu.d.ts';
import type { ElectronNativeImage } from './ElectronNativeImage.d.ts';
import type { ElectronPoint } from './ElectronPoint.d.ts';
import type { ElectronRectangle } from './ElectronRectangle.d.ts';
import type { ElectronTitleOptions } from './ElectronTitleOptions.d.ts';

/**
 * Electron Tray for adding icons and context menus to the system's notification area.
 *
 * @public
 * @unofficial
 */
export declare class ElectronTray {
  /**
   * Create a new instance of {@link ElectronTray}.
   *
   * @param image - The image to use as the tray icon.
   * @param guid - Assigns a GUID to the tray icon. `win32` only.
   */
  constructor(image: ElectronNativeImage | string, guid?: string);

  /**
   * Registers an event listener that is invoked when the tray balloon is clicked. `win32` only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This tray instance.
   */
  addListener(event: 'balloon-click', listener: () => void): this;
  /**
   * Registers an event listener that is invoked when the tray balloon is closed because of timeout or user manually closes it. `win32` only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This tray instance.
   */
  addListener(event: 'balloon-closed', listener: () => void): this;
  /**
   * Registers an event listener that is invoked when the tray balloon shows. `win32` only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This tray instance.
   */
  addListener(event: 'balloon-show', listener: () => void): this;
  /**
   * Registers an event listener that is invoked when the tray icon is clicked.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event, the bounds of the tray icon, and the position of the event.
   * @returns This tray instance.
   */
  addListener(event: 'click', listener: (event: ElectronKeyboardEvent, bounds: ElectronRectangle, position: ElectronPoint) => void): this;
  /**
   * Registers an event listener that is invoked when the tray icon is double clicked. `darwin` and `win32` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the bounds of the tray icon.
   * @returns This tray instance.
   */
  addListener(event: 'double-click', listener: (event: ElectronKeyboardEvent, bounds: ElectronRectangle) => void): this;
  /**
   * Registers an event listener that is invoked when a drag operation ends on the tray or ends at another location. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This tray instance.
   */
  addListener(event: 'drag-end', listener: () => void): this;
  /**
   * Registers an event listener that is invoked when a drag operation enters the tray icon. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This tray instance.
   */
  addListener(event: 'drag-enter', listener: () => void): this;
  /**
   * Registers an event listener that is invoked when a drag operation exits the tray icon. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This tray instance.
   */
  addListener(event: 'drag-leave', listener: () => void): this;
  /**
   * Registers an event listener that is invoked when any dragged items are dropped on the tray icon. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This tray instance.
   */
  addListener(event: 'drop', listener: () => void): this;
  /**
   * Registers an event listener that is invoked when dragged files are dropped in the tray icon. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the paths of the dropped files.
   * @returns This tray instance.
   */
  addListener(event: 'drop-files', listener: (event: ElectronEvent, files: string[]) => void): this;
  /**
   * Registers an event listener that is invoked when dragged text is dropped in the tray icon. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the dropped text string.
   * @returns This tray instance.
   */
  addListener(event: 'drop-text', listener: (event: ElectronEvent, text: string) => void): this;
  /**
   * Registers an event listener that is invoked when the mouse clicks the tray icon. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the position of the event.
   * @returns This tray instance.
   */
  addListener(event: 'mouse-down', listener: (event: ElectronKeyboardEvent, position: ElectronPoint) => void): this;
  /**
   * Registers an event listener that is invoked when the mouse enters the tray icon. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the position of the event.
   * @returns This tray instance.
   */
  addListener(event: 'mouse-enter', listener: (event: ElectronKeyboardEvent, position: ElectronPoint) => void): this;
  /**
   * Registers an event listener that is invoked when the mouse exits the tray icon. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the position of the event.
   * @returns This tray instance.
   */
  addListener(event: 'mouse-leave', listener: (event: ElectronKeyboardEvent, position: ElectronPoint) => void): this;
  /**
   * Registers an event listener that is invoked when the mouse moves in the tray icon. `darwin` and `win32` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the position of the event.
   * @returns This tray instance.
   */
  addListener(event: 'mouse-move', listener: (event: ElectronKeyboardEvent, position: ElectronPoint) => void): this;
  /**
   * Registers an event listener that is invoked when the mouse is released from clicking the tray icon.
   *
   * Note: This will not be emitted if you have set a context menu for your tray using {@link ElectronTray.setContextMenu}, as a result of macOS-level constraints. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the position of the event.
   * @returns This tray instance.
   */
  addListener(event: 'mouse-up', listener: (event: ElectronKeyboardEvent, position: ElectronPoint) => void): this;
  /**
   * Registers an event listener that is invoked when the tray icon is right clicked. `darwin` and `win32` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the bounds of the tray icon.
   * @returns This tray instance.
   */
  addListener(event: 'right-click', listener: (event: ElectronKeyboardEvent, bounds: ElectronRectangle) => void): this;

  /**
   * Closes an open context menu, as set by {@link ElectronTray.setContextMenu}. `darwin` and `win32` only.
   */
  closeContextMenu(): void;

  /** Destroys the tray icon immediately. */
  destroy(): void;

  /**
   * Displays a tray balloon. `win32` only.
   *
   * @param options - Options describing the balloon to display.
   */
  displayBalloon(options: ElectronDisplayBalloonOptions): void;

  /**
   * Returns focus to the taskbar notification area. Notification area icons should use this message when they have completed their UI operation. For example, if the icon displays a shortcut menu, but the user presses ESC to cancel it, use `tray.focus()` to return focus to the notification area. `win32` only.
   */
  focus(): void;

  /**
   * The `bounds` of this tray icon. `darwin` and `win32` only.
   *
   * @returns The bounds of this tray icon.
   */
  getBounds(): ElectronRectangle;

  /**
   * Whether double click events will be ignored. `darwin` only.
   *
   * @returns `true` if double click events are ignored.
   */
  getIgnoreDoubleClickEvents(): boolean;

  /**
   * The title displayed next to the tray icon in the status bar. `darwin` only.
   *
   * @returns The title displayed next to the tray icon.
   */
  getTitle(): string;

  /**
   * Whether the tray icon is destroyed.
   *
   * @returns `true` if the tray icon is destroyed.
   */
  isDestroyed(): boolean;

  /**
   * Registers a listener that is invoked when the tray balloon is clicked. `win32` only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This tray instance.
   */
  on(event: 'balloon-click', listener: () => void): this;
  /**
   * Registers a listener that is invoked when the tray balloon is closed because of timeout or user manually closes it. `win32` only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This tray instance.
   */
  on(event: 'balloon-closed', listener: () => void): this;
  /**
   * Registers a listener that is invoked when the tray balloon shows. `win32` only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This tray instance.
   */
  on(event: 'balloon-show', listener: () => void): this;
  /**
   * Registers a listener that is invoked when the tray icon is clicked.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event, the bounds of the tray icon, and the position of the event.
   * @returns This tray instance.
   */
  on(event: 'click', listener: (event: ElectronKeyboardEvent, bounds: ElectronRectangle, position: ElectronPoint) => void): this;
  /**
   * Registers a listener that is invoked when the tray icon is double clicked. `darwin` and `win32` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the bounds of the tray icon.
   * @returns This tray instance.
   */
  on(event: 'double-click', listener: (event: ElectronKeyboardEvent, bounds: ElectronRectangle) => void): this;
  /**
   * Registers a listener that is invoked when a drag operation ends on the tray or ends at another location. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This tray instance.
   */
  on(event: 'drag-end', listener: () => void): this;
  /**
   * Registers a listener that is invoked when a drag operation enters the tray icon. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This tray instance.
   */
  on(event: 'drag-enter', listener: () => void): this;
  /**
   * Registers a listener that is invoked when a drag operation exits the tray icon. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This tray instance.
   */
  on(event: 'drag-leave', listener: () => void): this;
  /**
   * Registers a listener that is invoked when any dragged items are dropped on the tray icon. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This tray instance.
   */
  on(event: 'drop', listener: () => void): this;
  /**
   * Registers a listener that is invoked when dragged files are dropped in the tray icon. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the paths of the dropped files.
   * @returns This tray instance.
   */
  on(event: 'drop-files', listener: (event: ElectronEvent, files: string[]) => void): this;
  /**
   * Registers a listener that is invoked when dragged text is dropped in the tray icon. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the dropped text string.
   * @returns This tray instance.
   */
  on(event: 'drop-text', listener: (event: ElectronEvent, text: string) => void): this;
  /**
   * Registers a listener that is invoked when the mouse clicks the tray icon. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the position of the event.
   * @returns This tray instance.
   */
  on(event: 'mouse-down', listener: (event: ElectronKeyboardEvent, position: ElectronPoint) => void): this;
  /**
   * Registers a listener that is invoked when the mouse enters the tray icon. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the position of the event.
   * @returns This tray instance.
   */
  on(event: 'mouse-enter', listener: (event: ElectronKeyboardEvent, position: ElectronPoint) => void): this;
  /**
   * Registers a listener that is invoked when the mouse exits the tray icon. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the position of the event.
   * @returns This tray instance.
   */
  on(event: 'mouse-leave', listener: (event: ElectronKeyboardEvent, position: ElectronPoint) => void): this;
  /**
   * Registers a listener that is invoked when the mouse moves in the tray icon. `darwin` and `win32` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the position of the event.
   * @returns This tray instance.
   */
  on(event: 'mouse-move', listener: (event: ElectronKeyboardEvent, position: ElectronPoint) => void): this;
  /**
   * Registers a listener that is invoked when the mouse is released from clicking the tray icon.
   *
   * Note: This will not be emitted if you have set a context menu for your tray using {@link ElectronTray.setContextMenu}, as a result of macOS-level constraints. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the position of the event.
   * @returns This tray instance.
   */
  on(event: 'mouse-up', listener: (event: ElectronKeyboardEvent, position: ElectronPoint) => void): this;
  /**
   * Registers a listener that is invoked when the tray icon is right clicked. `darwin` and `win32` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the bounds of the tray icon.
   * @returns This tray instance.
   */
  on(event: 'right-click', listener: (event: ElectronKeyboardEvent, bounds: ElectronRectangle) => void): this;

  /**
   * Registers a one-time listener that is invoked when the tray balloon is clicked. `win32` only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This tray instance.
   */
  once(event: 'balloon-click', listener: () => void): this;
  /**
   * Registers a one-time listener that is invoked when the tray balloon is closed because of timeout or user manually closes it. `win32` only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This tray instance.
   */
  once(event: 'balloon-closed', listener: () => void): this;
  /**
   * Registers a one-time listener that is invoked when the tray balloon shows. `win32` only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This tray instance.
   */
  once(event: 'balloon-show', listener: () => void): this;
  /**
   * Registers a one-time listener that is invoked when the tray icon is clicked.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event, the bounds of the tray icon, and the position of the event.
   * @returns This tray instance.
   */
  once(event: 'click', listener: (event: ElectronKeyboardEvent, bounds: ElectronRectangle, position: ElectronPoint) => void): this;
  /**
   * Registers a one-time listener that is invoked when the tray icon is double clicked. `darwin` and `win32` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the bounds of the tray icon.
   * @returns This tray instance.
   */
  once(event: 'double-click', listener: (event: ElectronKeyboardEvent, bounds: ElectronRectangle) => void): this;
  /**
   * Registers a one-time listener that is invoked when a drag operation ends on the tray or ends at another location. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This tray instance.
   */
  once(event: 'drag-end', listener: () => void): this;
  /**
   * Registers a one-time listener that is invoked when a drag operation enters the tray icon. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This tray instance.
   */
  once(event: 'drag-enter', listener: () => void): this;
  /**
   * Registers a one-time listener that is invoked when a drag operation exits the tray icon. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This tray instance.
   */
  once(event: 'drag-leave', listener: () => void): this;
  /**
   * Registers a one-time listener that is invoked when any dragged items are dropped on the tray icon. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This tray instance.
   */
  once(event: 'drop', listener: () => void): this;
  /**
   * Registers a one-time listener that is invoked when dragged files are dropped in the tray icon. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the paths of the dropped files.
   * @returns This tray instance.
   */
  once(event: 'drop-files', listener: (event: ElectronEvent, files: string[]) => void): this;
  /**
   * Registers a one-time listener that is invoked when dragged text is dropped in the tray icon. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the dropped text string.
   * @returns This tray instance.
   */
  once(event: 'drop-text', listener: (event: ElectronEvent, text: string) => void): this;
  /**
   * Registers a one-time listener that is invoked when the mouse clicks the tray icon. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the position of the event.
   * @returns This tray instance.
   */
  once(event: 'mouse-down', listener: (event: ElectronKeyboardEvent, position: ElectronPoint) => void): this;
  /**
   * Registers a one-time listener that is invoked when the mouse enters the tray icon. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the position of the event.
   * @returns This tray instance.
   */
  once(event: 'mouse-enter', listener: (event: ElectronKeyboardEvent, position: ElectronPoint) => void): this;
  /**
   * Registers a one-time listener that is invoked when the mouse exits the tray icon. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the position of the event.
   * @returns This tray instance.
   */
  once(event: 'mouse-leave', listener: (event: ElectronKeyboardEvent, position: ElectronPoint) => void): this;
  /**
   * Registers a one-time listener that is invoked when the mouse moves in the tray icon. `darwin` and `win32` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the position of the event.
   * @returns This tray instance.
   */
  once(event: 'mouse-move', listener: (event: ElectronKeyboardEvent, position: ElectronPoint) => void): this;
  /**
   * Registers a one-time listener that is invoked when the mouse is released from clicking the tray icon.
   *
   * Note: This will not be emitted if you have set a context menu for your tray using {@link ElectronTray.setContextMenu}, as a result of macOS-level constraints. `darwin` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the position of the event.
   * @returns This tray instance.
   */
  once(event: 'mouse-up', listener: (event: ElectronKeyboardEvent, position: ElectronPoint) => void): this;
  /**
   * Registers a one-time listener that is invoked when the tray icon is right clicked. `darwin` and `win32` only.
   *
   * @param event - The event name.
   * @param listener - The event handler receiving the event and the bounds of the tray icon.
   * @returns This tray instance.
   */
  once(event: 'right-click', listener: (event: ElectronKeyboardEvent, bounds: ElectronRectangle) => void): this;

  /**
   * Pops up the context menu of the tray icon. When `menu` is passed, the `menu` will be shown instead of the tray icon's context menu.
   *
   * The `position` is only available on Windows, and it is (0, 0) by default. `darwin` and `win32` only.
   *
   * @param menu - The menu to show instead of the tray icon's context menu.
   * @param position - The position at which to pop up the menu.
   */
  popUpContextMenu(menu?: ElectronMenu, position?: ElectronPoint): void;

  /**
   * Removes a tray balloon. `win32` only.
   */
  removeBalloon(): void;

  /**
   * Removes the event listener for the tray balloon being clicked.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This tray instance.
   */
  removeListener(event: 'balloon-click', listener: () => void): this;
  /**
   * Removes the event listener for the tray balloon being closed.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This tray instance.
   */
  removeListener(event: 'balloon-closed', listener: () => void): this;
  /**
   * Removes the event listener for the tray balloon being shown.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This tray instance.
   */
  removeListener(event: 'balloon-show', listener: () => void): this;
  /**
   * Removes the event listener for the tray icon being clicked.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This tray instance.
   */
  removeListener(event: 'click', listener: (event: ElectronKeyboardEvent, bounds: ElectronRectangle, position: ElectronPoint) => void): this;
  /**
   * Removes the event listener for the tray icon being double clicked.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This tray instance.
   */
  removeListener(event: 'double-click', listener: (event: ElectronKeyboardEvent, bounds: ElectronRectangle) => void): this;
  /**
   * Removes the event listener for a drag operation ending.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This tray instance.
   */
  removeListener(event: 'drag-end', listener: () => void): this;
  /**
   * Removes the event listener for a drag operation entering the tray icon.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This tray instance.
   */
  removeListener(event: 'drag-enter', listener: () => void): this;
  /**
   * Removes the event listener for a drag operation exiting the tray icon.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This tray instance.
   */
  removeListener(event: 'drag-leave', listener: () => void): this;
  /**
   * Removes the event listener for dragged items being dropped on the tray icon.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This tray instance.
   */
  removeListener(event: 'drop', listener: () => void): this;
  /**
   * Removes the event listener for dragged files being dropped in the tray icon.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This tray instance.
   */
  removeListener(event: 'drop-files', listener: (event: ElectronEvent, files: string[]) => void): this;
  /**
   * Removes the event listener for dragged text being dropped in the tray icon.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This tray instance.
   */
  removeListener(event: 'drop-text', listener: (event: ElectronEvent, text: string) => void): this;
  /**
   * Removes the event listener for the mouse clicking the tray icon.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This tray instance.
   */
  removeListener(event: 'mouse-down', listener: (event: ElectronKeyboardEvent, position: ElectronPoint) => void): this;
  /**
   * Removes the event listener for the mouse entering the tray icon.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This tray instance.
   */
  removeListener(event: 'mouse-enter', listener: (event: ElectronKeyboardEvent, position: ElectronPoint) => void): this;
  /**
   * Removes the event listener for the mouse exiting the tray icon.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This tray instance.
   */
  removeListener(event: 'mouse-leave', listener: (event: ElectronKeyboardEvent, position: ElectronPoint) => void): this;
  /**
   * Removes the event listener for the mouse moving in the tray icon.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This tray instance.
   */
  removeListener(event: 'mouse-move', listener: (event: ElectronKeyboardEvent, position: ElectronPoint) => void): this;
  /**
   * Removes the event listener for the mouse being released from clicking the tray icon.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This tray instance.
   */
  removeListener(event: 'mouse-up', listener: (event: ElectronKeyboardEvent, position: ElectronPoint) => void): this;
  /**
   * Removes the event listener for the tray icon being right clicked.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This tray instance.
   */
  removeListener(event: 'right-click', listener: (event: ElectronKeyboardEvent, bounds: ElectronRectangle) => void): this;

  /** Sets the context menu for this icon. */
  setContextMenu(menu: ElectronMenu | null): void;

  /**
   * Sets the option to ignore double click events. Ignoring these events allows you to detect every individual click of the tray icon. `darwin` only.
   *
   * @param ignore - Whether to ignore double click events.
   */
  setIgnoreDoubleClickEvents(ignore: boolean): void;

  /**
   * Sets the `image` associated with this tray icon.
   *
   * @param image - The image to use as the tray icon.
   */
  setImage(image: ElectronNativeImage | string): void;

  /**
   * Sets the `image` associated with this tray icon when pressed on macOS. `darwin` only.
   *
   * @param image - The image to use as the pressed tray icon.
   */
  setPressedImage(image: ElectronNativeImage | string): void;

  /**
   * Sets the title displayed next to the tray icon in the status bar (Support ANSI colors). `darwin` only.
   *
   * @param title - The title to display next to the tray icon.
   * @param options - Options describing how the title is displayed.
   */
  setTitle(title: string, options?: ElectronTitleOptions): void;

  /**
   * Sets the hover text for this tray icon.
   *
   * @param toolTip - The hover text for this tray icon.
   */
  setToolTip(toolTip: string): void;
}
