import type { PrismTokenStream } from './PrismTokenStream.d.ts';

/**
 * Prism utility functions.
 *
 * @public
 * @unofficial
 */
export interface PrismUtil {
  /**
   * Deep clones an object.
   *
   * @param o - The object to clone.
   * @returns A deep clone of the object.
   */
  clone<T>(o: T): T;

  /**
   * Encodes tokens by replacing special HTML characters.
   *
   * @param tokens - The token stream to encode.
   * @returns The encoded token stream.
   */
  encode(tokens: PrismTokenStream): PrismTokenStream;

  /**
   * Returns a unique identifier for the given object.
   *
   * @param obj - The object to identify.
   * @returns The unique numeric identifier.
   */
  objId(obj: unknown): number;

  /**
   * Returns the type of the given value as a string.
   *
   * @param o - The value to check.
   * @returns The type string.
   */
  type(o: unknown): string;
}
