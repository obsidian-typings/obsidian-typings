export {};

declare module 'obsidian' {
    /**
     * Abstract constructor type.
     *
     * @typeParam T - The type of the class to create.
     * @param args - The arguments to pass to the constructor.
     * @returns A new instance of the class.
     *
     * @example
     * ```ts
     * abstract class AbstractClass {}
     * const ctor: Constructor<AbstractClass> = AbstractClass;
     * class ChildClass extends ctor {}
     * ```
     *
     * @deprecated - Added only for typing purposes. Use {@link Constructor} instead.
     */
    type Constructor__<T> = abstract new(...args: any[]) => T;
}
