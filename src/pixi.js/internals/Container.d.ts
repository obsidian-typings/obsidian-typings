import type { DisplayObject } from './DisplayObject.d.ts';
import type { IDestroyOptions } from './IDestroyOptions.d.ts';

/**
 * Container for display objects.
 *
 * @public
 * @unofficial
 */
export declare class Container<T extends DisplayObject = DisplayObject> extends DisplayObject {
  /** Children of this container (read-only). */
  readonly children: T[];

  /** Parent container. */
  parent: Container;

  /** Whether children should be sorted by zIndex. */
  sortableChildren: boolean;

  /** Whether the children need sorting. */
  sortDirty: boolean;

  /**
   * Adds one or more children to the container.
   *
   * @param children - Children to add.
   * @returns The first child added.
   */
  addChild<U extends T[]>(...children: U): U[0];

  /**
   * Adds a child at a specific index.
   *
   * @param child - Child to add.
   * @param index - Index to insert at.
   * @returns The child added.
   */
  addChildAt<U extends T>(child: U, index: number): U;

  /**
   * Destroys this container.
   *
   * @param options - Destroy options.
   */
  destroy(options?: boolean | IDestroyOptions): void;

  /**
   * Returns the child at the given index.
   *
   * @param index - Index of the child.
   * @returns The child at the index.
   */
  getChildAt(index: number): T;

  /**
   * Returns the index of a child.
   *
   * @param child - The child to find.
   * @returns The index of the child.
   */
  getChildIndex(child: T): number;

  /** Height of the container. */
  get height(): number;

  // eslint-disable-next-line jsdoc/require-jsdoc -- Doc comment must be on getter per api-extractor.
  set height(value: number);

  /**
   * Removes one or more children from the container.
   *
   * @param children - Children to remove.
   * @returns The first child removed.
   */
  removeChild<U extends T[]>(...children: U): U[0];

  /**
   * Removes the child at a specific index.
   *
   * @param index - Index of the child to remove.
   * @returns The removed child.
   */
  removeChildAt(index: number): T;

  /**
   * Removes children from the container.
   *
   * @param beginIndex - Start index.
   * @param endIndex - End index.
   * @returns The removed children.
   */
  removeChildren(beginIndex?: number, endIndex?: number): T[];

  /**
   * Sets the index of a child.
   *
   * @param child - The child.
   * @param index - The new index.
   */
  setChildIndex(child: T, index: number): void;

  /** Sorts the children by zIndex. */
  sortChildren(): void;

  /** Width of the container. */
  get width(): number;

  // eslint-disable-next-line jsdoc/require-jsdoc -- Doc comment must be on getter per api-extractor.
  set width(value: number);
}
