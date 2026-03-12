/**
 * Font metrics used by MathJax for scaling and positioning math output.
 *
 * @public
 * @unofficial
 */
export interface ExtendedMetrics {
  /** Width of the container element in pixels. */
  containerWidth: number;

  /** Size of 1em in pixels for the current font. */
  em: number;

  /** Size of 1ex in pixels for the current font. */
  ex: number;

  /** CSS font family string. */
  family: string;

  /** Available line width for the math output in pixels. */
  lineWidth: number;

  /** Scale factor for the math output relative to the surrounding text. */
  scale: number;
}
