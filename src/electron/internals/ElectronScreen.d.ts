import type { ElectronBrowserWindow } from './ElectronBrowserWindow.d.ts';
import type { ElectronDisplay } from './ElectronDisplay.d.ts';
import type { ElectronEvent } from './ElectronEvent.d.ts';
import type { ElectronPoint } from './ElectronPoint.d.ts';
import type { ElectronRectangle } from './ElectronRectangle.d.ts';

/**
 * Electron Screen for retrieving information about screen size, displays, cursor position, and so on.
 *
 * @public
 * @unofficial
 */
export interface ElectronScreen {
  /**
   * Adds a listener for the `display-added` event.
   *
   * Emitted when `newDisplay` has been added.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronScreen` instance.
   */
  addListener(event: 'display-added', listener: (event: ElectronEvent, newDisplay: ElectronDisplay) => void): this;

  /**
   * Adds a listener for the `display-metrics-changed` event.
   *
   * Emitted when one or more metrics change in a `display`. The `changedMetrics` is an array of strings that describe
   * the changes. Possible changes are `bounds`, `workArea`, `scaleFactor` and `rotation`.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronScreen` instance.
   */
  addListener(event: 'display-metrics-changed', listener: (event: ElectronEvent, display: ElectronDisplay, changedMetrics: string[]) => void): this;

  /**
   * Adds a listener for the `display-removed` event.
   *
   * Emitted when `oldDisplay` has been removed.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronScreen` instance.
   */
  addListener(event: 'display-removed', listener: (event: ElectronEvent, oldDisplay: ElectronDisplay) => void): this;

  /**
   * Converts a screen DIP point to a screen physical point. The DPI scale is performed relative to the display
   * containing the DIP point.
   *
   * @param point - The screen DIP point to convert.
   * @returns The corresponding screen physical point.
   *
   * Platform: `win32`.
   */
  dipToScreenPoint(point: ElectronPoint): ElectronPoint;

  /**
   * Converts a screen DIP rect to a screen physical rect. The DPI scale is performed relative to the display nearest
   * to `window`. If `window` is `null`, scaling will be performed to the display nearest to `rect`.
   *
   * @param window - The window used to determine the display, or `null`.
   * @param rect - The screen DIP rect to convert.
   * @returns The corresponding screen physical rect.
   *
   * Platform: `win32`.
   */
  dipToScreenRect(window: ElectronBrowserWindow | null, rect: ElectronRectangle): ElectronRectangle;

  /**
   * Returns an array of displays that are currently available.
   *
   * @returns The available displays.
   */
  getAllDisplays(): ElectronDisplay[];

  /**
   * Returns the current absolute position of the mouse pointer.
   *
   * **Note:** The return value is a DIP point, not a screen physical point.
   *
   * @returns The current absolute position of the mouse pointer.
   */
  getCursorScreenPoint(): ElectronPoint;

  /**
   * Returns the display that most closely intersects the provided bounds.
   *
   * @param rect - The bounds to match against.
   * @returns The display that most closely intersects the provided bounds.
   */
  getDisplayMatching(rect: ElectronRectangle): ElectronDisplay;

  /**
   * Returns the display nearest the specified point.
   *
   * @param point - The point to find the nearest display for.
   * @returns The display nearest the specified point.
   */
  getDisplayNearestPoint(point: ElectronPoint): ElectronDisplay;

  /**
   * Returns the primary display.
   *
   * @returns The primary display.
   */
  getPrimaryDisplay(): ElectronDisplay;

  /**
   * Registers a listener for the `display-added` event.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronScreen` instance.
   */
  on(event: 'display-added', listener: (event: ElectronEvent, newDisplay: ElectronDisplay) => void): this;

  /**
   * Registers a listener for the `display-metrics-changed` event.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronScreen` instance.
   */
  on(event: 'display-metrics-changed', listener: (event: ElectronEvent, display: ElectronDisplay, changedMetrics: string[]) => void): this;

  /**
   * Registers a listener for the `display-removed` event.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronScreen` instance.
   */
  on(event: 'display-removed', listener: (event: ElectronEvent, oldDisplay: ElectronDisplay) => void): this;

  /**
   * Registers a one-time listener for the `display-added` event. The listener is removed after it is invoked once.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronScreen` instance.
   */
  once(event: 'display-added', listener: (event: ElectronEvent, newDisplay: ElectronDisplay) => void): this;

  /**
   * Registers a one-time listener for the `display-metrics-changed` event. The listener is removed after it is
   * invoked once.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronScreen` instance.
   */
  once(event: 'display-metrics-changed', listener: (event: ElectronEvent, display: ElectronDisplay, changedMetrics: string[]) => void): this;

  /**
   * Registers a one-time listener for the `display-removed` event. The listener is removed after it is invoked once.
   *
   * @param event - The event name.
   * @param listener - The event handler.
   * @returns This `ElectronScreen` instance.
   */
  once(event: 'display-removed', listener: (event: ElectronEvent, oldDisplay: ElectronDisplay) => void): this;

  /**
   * Removes the specified listener for the `display-added` event.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This `ElectronScreen` instance.
   */
  removeListener(event: 'display-added', listener: (event: ElectronEvent, newDisplay: ElectronDisplay) => void): this;

  /**
   * Removes the specified listener for the `display-metrics-changed` event.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This `ElectronScreen` instance.
   */
  removeListener(event: 'display-metrics-changed', listener: (event: ElectronEvent, display: ElectronDisplay, changedMetrics: string[]) => void): this;

  /**
   * Removes the specified listener for the `display-removed` event.
   *
   * @param event - The event name.
   * @param listener - The event handler to remove.
   * @returns This `ElectronScreen` instance.
   */
  removeListener(event: 'display-removed', listener: (event: ElectronEvent, oldDisplay: ElectronDisplay) => void): this;

  /**
   * Converts a screen physical point to a screen DIP point. The DPI scale is performed relative to the display
   * containing the physical point.
   *
   * @param point - The screen physical point to convert.
   * @returns The corresponding screen DIP point.
   *
   * Platform: `win32`.
   */
  screenToDipPoint(point: ElectronPoint): ElectronPoint;

  /**
   * Converts a screen physical rect to a screen DIP rect. The DPI scale is performed relative to the display nearest
   * to `window`. If `window` is `null`, scaling will be performed to the display nearest to `rect`.
   *
   * @param window - The window used to determine the display, or `null`.
   * @param rect - The screen physical rect to convert.
   * @returns The corresponding screen DIP rect.
   *
   * Platform: `win32`.
   */
  screenToDipRect(window: ElectronBrowserWindow | null, rect: ElectronRectangle): ElectronRectangle;
}
