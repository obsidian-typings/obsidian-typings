import type { StyleModuleMountOptions } from './StyleModuleMountOptions.d.ts';
import type { StyleModuleOptions } from './StyleModuleOptions.d.ts';
import type { StyleModuleSpec } from './StyleModuleSpec.d.ts';

/**
 * A CSS module that can be mounted into a document or shadow root.
 *
 * @public
 * @unofficial
 */
export declare class StyleModule {
  /** */
  constructor(spec: StyleModuleSpec, options?: StyleModuleOptions);

  /** Get the generated CSS rules as a string. */
  getRules(): string;

  /**
   * Mount style module(s) into a document or shadow root.
   *
   * @param root - The document or shadow root to mount into.
   * @param module - The style module(s) to mount.
   * @param options - Optional mount options.
   */
  static mount(
    root: Document | DocumentOrShadowRoot | ShadowRoot,
    module: readonly StyleModule[] | StyleModule,
    options?: StyleModuleMountOptions
  ): void;

  /**
   * Generate a new unique CSS class name.
   *
   * @returns A unique class name string.
   */
  static newName(): string;
}
