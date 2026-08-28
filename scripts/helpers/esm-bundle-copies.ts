/**
 * A CJS declaration bundle and the ESM entry point that must be a byte-for-byte copy of it.
 */
export interface EsmBundleCopy {
  /** Repo-relative path of the generated CJS declaration bundle, the copy's source. */
  readonly cjsPath: string;

  /** Repo-relative path of the ESM entry point, the copy's target. */
  readonly esmPath: string;
}

/**
 * The `dist/esm/*.d.mts` entry points must be byte-for-byte copies of their `dist/cjs/*.d.cts`
 * counterparts, not re-export shims.
 *
 * A declaration file has exactly one `impliedNodeFormat`, and every bare specifier inside it resolves
 * under that format's export conditions. `@codemirror/view` (like `@codemirror/state` and `style-mod`)
 * publishes no `types` condition, so TypeScript derives the declaration from the JS target: `import` →
 * `dist/index.d.ts`, `require` → `dist/index.d.cts`. Those are two unrelated declarations, and because
 * a diagnostic prints them without their extension, both sides of the resulting error read alike.
 *
 * A shim cannot bridge that. `export type * from '../cjs/types.d.cts' with { 'resolution-mode':
 * 'import' }` governs only how *that one specifier* resolves — the target keeps
 * `impliedNodeFormat: CommonJS`, so all ~2800 `declare module "@codemirror/…"` blocks inside it attach
 * to the `.d.cts` copy while an ESM consumer holds the `.d.ts` copy. The consumer then gets `TS2719`
 * ("Two different types with this name exist, but they are unrelated") on something as ordinary as
 * `const view: EditorView = editor.activeCM`, with both sides of the error printing the same path.
 *
 * Pinning the bare specifiers instead — giving each one inside the bundle its own `resolution-mode`
 * attribute — is strictly worse: a `declare module` block cannot carry an import attribute, so the
 * augmentations keep resolving in CJS mode and attach to a file that is now never loaded. Every
 * augmented member silently disappears, turning a loud error into silent type loss.
 *
 * So dual publishing needs two real copies. That is cheap here: the bundles are format-agnostic text
 * (they keep `import type … from '@codemirror/view'` rather than inlining it) and carry the
 * `/// <reference types="node" />` that `fix-bundle-types.ts` prepends, so a copy needs no second
 * `dts-bundle-generator` run. The cost is a roughly doubled declaration payload in the published
 * package, which is the standard dual-publish price.
 *
 * `build:copy-esm-bundle-types` writes these copies and `build:validate-bundle-types` type-checks both
 * sides and asserts the copies are byte-identical, so a regression back to shims fails the build
 * structurally — a shim type-checks perfectly well on its own, so nothing else would catch it.
 */
export const ESM_BUNDLE_COPIES: readonly EsmBundleCopy[] = [
  {
    cjsPath: 'dist/cjs/types.d.cts',
    esmPath: 'dist/esm/types.d.mts'
  },
  {
    cjsPath: 'dist/cjs/implementations.d.cts',
    esmPath: 'dist/esm/implementations.d.mts'
  }
];
