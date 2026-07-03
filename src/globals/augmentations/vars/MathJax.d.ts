import type { MathJaxEx } from '../../../mathjax/internals/MathJaxEx.d.ts';

export {};

declare global {
  /**
   * MathJax instance for rendering mathematical notation.
   *
   * @unofficial
   */
  var MathJax: MathJaxEx;
}
