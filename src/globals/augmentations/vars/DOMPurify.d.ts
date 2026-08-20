import type { DOMPurifyEx } from '../../../dompurify/internals/DOMPurifyEx.d.ts';

export {};

declare global {
  /**
   * DOMPurify is a DOM-only, super-fast, uber-tolerant XSS sanitizer for HTML, MathML and SVG.
   *
   * @unofficial
   */
  var DOMPurify: DOMPurifyEx;
}
