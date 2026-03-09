import type { ConstructorBase } from './ConstructorBase.d.ts';

/**
 * Extracts a constructor type from an interface that defines a `constructor__`, `constructor2__`,
 * `constructor3__`, `constructor4__`, or `constructor5__` method.
 *
 * Prefers higher-numbered variants over lower-numbered ones when multiple are present,
 * since higher-numbered variants represent deeper subclass constructors when ancestor classes
 * already define lower-numbered ones.
 *
 * @typeParam T - An interface with a `constructor[N]__` method, or a function type directly.
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
export type ExtractConstructor<T> = T extends { constructor5__(...args: infer Args): infer Instance }
    ? ConstructorBase<Args, Instance>
    : T extends { constructor4__(...args: infer Args): infer Instance } ? ConstructorBase<Args, Instance>
    : T extends { constructor3__(...args: infer Args): infer Instance } ? ConstructorBase<Args, Instance>
    : T extends { constructor2__(...args: infer Args): infer Instance } ? ConstructorBase<Args, Instance>
    : T extends { constructor__(...args: infer Args): infer Instance } ? ConstructorBase<Args, Instance>
    : T extends (...args: infer Args) => infer Instance ? ConstructorBase<Args, Instance>
    : never;
