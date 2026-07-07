export {};

declare module '@codemirror/state' {
  interface Annotation<T> {
    /**
     * The annotation type.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link type} instead.
     */
    readonly type__?: AnnotationType<T>;

    /**
     * The value of this annotation.
     *
     * @official
     * @deprecated - Added only for typing purposes. Use {@link value} instead.
     */
    readonly value__?: T;
  }

  namespace Annotation {
    /**
     * Define a new type of annotation.
     *
     * @returns The new annotation type.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link Annotation.define} instead.
     */
    function define__<T>(): AnnotationType<T>;
  }
}
