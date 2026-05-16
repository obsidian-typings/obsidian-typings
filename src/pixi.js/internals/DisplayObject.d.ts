import type { Container } from './Container.d.ts';
import type { IDestroyOptions } from './IDestroyOptions.d.ts';
import type { IHitArea } from './IHitArea.d.ts';
import type { IPointData } from './IPointData.d.ts';
import type { Matrix } from './Matrix.d.ts';
import type { ObservablePoint } from './ObservablePoint.d.ts';
import type { PixiRectangle } from './PixiRectangle.d.ts';
import type { Transform } from './Transform.d.ts';

/**
 * Base class for all display objects.
 *
 * @public
 * @unofficial
 */
export declare abstract class DisplayObject {
  /** Alpha (opacity). */
  alpha: number;

  /** Rotation angle in degrees. */
  angle: number;

  /** Cursor style when hovering. */
  cursor: null | string;

  /** Hit area shape. */
  hitArea: IHitArea | null;

  /** Whether the object is interactive. */
  interactive: boolean;

  /** Display name. */
  name: null | string;

  /** Parent container. */
  parent: Container;

  /** Whether the object is renderable. */
  renderable: boolean;

  /** Rotation in radians. */
  rotation: number;

  /** Transform data. */
  transform: Transform;

  /** Whether the object is visible. */
  visible: boolean;

  /** Alpha relative to the scene. */
  worldAlpha: number;

  /** World transform matrix (read-only). */
  readonly worldTransform: Matrix;

  /** Whether the object is visible in the scene (read-only). */
  readonly worldVisible: boolean;

  /** X position. */
  x: number;

  /** Y position. */
  y: number;

  /** Z-index for sorting. */
  zIndex: number;

  /**
   * Destroys this display object.
   *
   * @param options - Destroy options.
   */
  destroy(options?: boolean | IDestroyOptions): void;

  /**
   * Emits an event.
   *
   * @param event - Event name.
   * @param args - Arguments.
   * @returns Whether any listeners were called.
   */
  emit(event: string | symbol, ...args: unknown[]): boolean;

  /**
   * Returns the bounds of the object.
   *
   * @param skipUpdate - Whether to skip the update.
   * @param rect - Rectangle to store bounds in.
   * @returns The bounds rectangle.
   */
  getBounds(skipUpdate?: boolean, rect?: PixiRectangle): PixiRectangle;

  /**
   * Returns the local bounds of the object.
   *
   * @param rect - Rectangle to store bounds in.
   * @returns The local bounds rectangle.
   */
  getLocalBounds(rect?: PixiRectangle): PixiRectangle;

  /**
   * Removes an event listener.
   *
   * @param event - Event name.
   * @param fn - Callback function.
   * @param context - Callback context.
   * @returns This object for chaining.
   */
  off(event: string | symbol, fn?: (...args: unknown[]) => void, context?: unknown): this;

  /**
   * Adds an event listener.
   *
   * @param event - Event name.
   * @param fn - Callback function.
   * @param context - Callback context.
   * @returns This object for chaining.
   */
  on(event: string | symbol, fn: (...args: unknown[]) => void, context?: unknown): this;

  /**
   * Adds a one-time event listener.
   *
   * @param event - Event name.
   * @param fn - Callback function.
   * @param context - Callback context.
   * @returns This object for chaining.
   */
  once(event: string | symbol, fn: (...args: unknown[]) => void, context?: unknown): this;

  /** Pivot point. */
  get pivot(): ObservablePoint;

  // eslint-disable-next-line jsdoc/require-jsdoc -- Doc comment must be on getter per api-extractor.
  set pivot(value: IPointData);

  /** Position. */
  get position(): ObservablePoint;

  // eslint-disable-next-line jsdoc/require-jsdoc -- Doc comment must be on getter per api-extractor.
  set position(value: IPointData);

  /**
   * Removes all listeners for the given event.
   *
   * @param event - Event name.
   * @returns This object for chaining.
   */
  removeAllListeners(event?: string | symbol): this;

  /** Scale. */
  get scale(): ObservablePoint;

  // eslint-disable-next-line jsdoc/require-jsdoc -- Doc comment must be on getter per api-extractor.
  set scale(value: IPointData);

  /** Skew. */
  get skew(): ObservablePoint;

  // eslint-disable-next-line jsdoc/require-jsdoc -- Doc comment must be on getter per api-extractor.
  set skew(value: IPointData);

  /**
   * Converts a point to global (screen) coordinates.
   *
   * @param position - The point to convert.
   * @param point - Output point.
   * @param skipUpdate - Whether to skip the update.
   * @returns The global point.
   */
  toGlobal<P extends IPointData = IPointData>(position: IPointData, point?: P, skipUpdate?: boolean): P;

  /**
   * Converts a point to local coordinates.
   *
   * @param position - The point to convert.
   * @param from - The display object to convert from.
   * @param point - Output point.
   * @param skipUpdate - Whether to skip the update.
   * @returns The local point.
   */
  toLocal<P extends IPointData = IPointData>(position: IPointData, from?: DisplayObject, point?: P, skipUpdate?: boolean): P;
}
