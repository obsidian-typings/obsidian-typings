export {};

declare global {
  /**
   * DOMPurify is a DOM-only, super-fast, uber-tolerant XSS sanitizer for HTML, MathML and SVG.
   *
   * @unofficial
   * @deprecated - Added only for typing purposes. Use {@link DOMPurify} instead.
   */
  const DOMPurify__: typeof window.DOMPurify;
}
