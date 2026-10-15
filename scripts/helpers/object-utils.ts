/**
 * @file
 *
 * The one member of `@mnaoumov/typescript-lib/object-utils` the vendored ESLint rules use, kept local because
 * this repo resolves no dependency on that package. The vendored `eslint-rules/ts-estree-node.ts` reaches it by
 * `../object-utils.ts`, which is the import `check:vendored-eslint-rules` maps the package specifier to.
 */

/**
 * Casts a value to a specific type.
 *
 * @typeParam T - The target type to cast to.
 * @param value - The value to cast.
 * @returns The value as the specified type.
 */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters -- We need to cast.
export function castTo<T>(value: unknown): T {
  return value as T;
}
