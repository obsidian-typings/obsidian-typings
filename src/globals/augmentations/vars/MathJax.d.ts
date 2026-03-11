import type { MathJax } from '../../../obsidian/internals/math-jax/MathJax.d.ts';

export {};

declare global {
  /**
   * MathJax instance for rendering mathematical notation.
   * @unofficial
   */
  const MathJax: MathJax;
}
