import type { MathJax as MathJaxType } from '../../../obsidian/internals/math-jax/MathJax.d.ts';

export {};

declare global {
  /**
   * MathJax instance for rendering mathematical notation.
   * @unofficial
   */
  const MathJax: MathJaxType;
}
