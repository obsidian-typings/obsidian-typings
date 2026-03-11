import type { MathJaxEx } from '../../../obsidian/internals/math-jax/MathJaxEx.d.ts';

export {};

declare global {
  /**
   * MathJax instance for rendering mathematical notation.
   * @unofficial
   */
  const MathJax: MathJaxEx;
}
