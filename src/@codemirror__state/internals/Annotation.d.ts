import type { AnnotationType } from './AnnotationType.d.ts';

/**
 * Annotations are tagged values that are used to provide metadata for transactions.
 *
 * @public
 * @unofficial
 */
export declare class Annotation<T> {
  /** The annotation type. */
  readonly type: AnnotationType<T>;

  /** The annotation value. */
  readonly value: T;
}
