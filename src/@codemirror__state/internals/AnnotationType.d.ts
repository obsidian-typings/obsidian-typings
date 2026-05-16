import type { Annotation } from './Annotation.d.ts';

/**
 * Marker type used to identify annotations.
 *
 * @public
 * @unofficial
 */
export declare class AnnotationType<T> {
  /**
   * Define a new annotation type.
   *
   * @returns The new annotation type.
   */
  static define<T>(): AnnotationType<T>;

  /**
   * Create an annotation of this type with the given value.
   *
   * @param value - The annotation value.
   * @returns The created annotation.
   */
  of(value: T): Annotation<T>;
}
