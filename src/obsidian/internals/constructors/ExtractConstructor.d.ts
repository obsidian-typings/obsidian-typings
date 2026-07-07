import type { ConstructorBase } from './ConstructorBase.d.ts';

/**
 * Extracts a constructor type from an interface that defines a `constructor__`, `constructor2__`,
 * `constructor3__`, `constructor4__`, or `constructor5__` method.
 *
 * Prefers higher-numbered variants over lower-numbered ones when multiple are present,
 * since higher-numbered variants represent deeper subclass constructors when ancestor classes
 * already define lower-numbered ones.
 *
 * The `constructor[N]__` helpers are declared optional (`constructor[N]__?`), so matching is done via
 * `'constructor[N]__' extends keyof T` (which sees optional keys) combined with `NonNullable` (which
 * strips the `| undefined` an optional member carries), rather than
 * `T extends { constructor[N]__(): … }` (which no longer matches an optional method). The final branch
 * still accepts a function type passed directly (e.g. `ExtractConstructor<App['constructor__']>`),
 * `NonNullable` likewise tolerating its optional `| undefined`.
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
export type ExtractConstructor<T> = 'constructor5__' extends keyof T ? NonNullable<T['constructor5__']> extends (...args: infer Args) => infer Instance ? ConstructorBase<Args, Instance> : never
  : 'constructor4__' extends keyof T ? NonNullable<T['constructor4__']> extends (...args: infer Args) => infer Instance ? ConstructorBase<Args, Instance> : never
  : 'constructor3__' extends keyof T ? NonNullable<T['constructor3__']> extends (...args: infer Args) => infer Instance ? ConstructorBase<Args, Instance> : never
  : 'constructor2__' extends keyof T ? NonNullable<T['constructor2__']> extends (...args: infer Args) => infer Instance ? ConstructorBase<Args, Instance> : never
  : 'constructor__' extends keyof T ? NonNullable<T['constructor__']> extends (...args: infer Args) => infer Instance ? ConstructorBase<Args, Instance> : never
  : NonNullable<T> extends (...args: infer Args) => infer Instance ? ConstructorBase<Args, Instance>
  : never;
