/**
 * Extracts a constructor type from an interface that defines a `constructor__` or `constructor2__` method.
 *
 * Prefers `constructor2__` over `constructor__` when both are present, since `constructor2__` represents
 * the class's own constructor when a parent class already defines `constructor__`.
 *
 * @typeParam T - An interface with a `constructor__` / `constructor2__` method, or a function type directly.
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
export type ExtractConstructor<T> = T extends { constructor2__(...args: infer Args): infer Instance }
    ? { new(...args: Args): Instance; prototype: Instance }
    : T extends { constructor__(...args: infer Args): infer Instance }
        ? { new(...args: Args): Instance; prototype: Instance }
        : T extends (...args: infer Args) => infer Instance
            ? { new(...args: Args): Instance; prototype: Instance }
            : never;
