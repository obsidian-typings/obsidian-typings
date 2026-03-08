/**
 * Extracts a constructor type from an interface that defines a `constructor__` or `constructor__2` method.
 *
 * Prefers `constructor__2` over `constructor__` when both are present, since `constructor__2` represents
 * the class's own constructor when a parent class already defines `constructor__`.
 *
 * @typeParam T - An interface with a `constructor__` / `constructor__2` method, or a function type directly.
 *
 * @example
 * ```ts
 * // From an interface:
 * type AppCtor = ExtractConstructor<App>;
 *
 * // From a constructor__ method type directly:
 * type AppCtor = ExtractConstructor<App['constructor__']>;
 * ```
 *
 * @public
 * @unofficial
 */
export type ExtractConstructor<T> = T extends { constructor__2(...args: infer Args): infer Instance }
    ? { new(...args: Args): Instance; prototype: Instance }
    : T extends { constructor__(...args: infer Args): infer Instance }
        ? { new(...args: Args): Instance; prototype: Instance }
        : T extends (...args: infer Args) => infer Instance
            ? { new(...args: Args): Instance; prototype: Instance }
            : never;
