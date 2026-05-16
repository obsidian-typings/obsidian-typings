export {};

declare module '@codemirror/state' {
  interface AnnotationType<T> {
    /**
     * Create an instance of this annotation.
     *
     * @param value - The annotation value.
     * @returns The created annotation.
     * @official
     */
    of(value: T): Annotation<T>;
  }
}
