import type { Matrix } from './Matrix.d.ts';
import type { ObservablePoint } from './ObservablePoint.d.ts';

/**
 * Transform that holds position, scale, pivot, skew, and rotation.
 *
 * @public
 * @unofficial
 */
export declare class Transform {
  /** Local transformation matrix. */
  localTransform: Matrix;

  /** Pivot point. */
  pivot: ObservablePoint;

  /** Position. */
  position: ObservablePoint;

  /** Rotation in radians. */
  rotation: number;

  /** Scale. */
  scale: ObservablePoint;

  /** Skew. */
  skew: ObservablePoint;

  /** World transformation matrix. */
  worldTransform: Matrix;
}
