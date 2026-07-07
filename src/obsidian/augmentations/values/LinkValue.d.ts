import type { getLinkValueConstructor } from '../../implementations/constructors/augmentations/values/getLinkValueConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * {@link Value} wrapping an internal wikilink.
   *
   * @since 1.10.0
   */
  interface LinkValue extends StringValue {
    /**
     * Reference to the app instance.
     *
     * @unofficial
     */
    app: App;

    /**
     * The display text of the link, or `null` if none.
     *
     * @unofficial
     */
    display: null | StringValue;

    /**
     * The source path the link is resolved relative to.
     *
     * @unofficial
     */
    sourcePath: string;

    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getLinkValueConstructor} from `obsidian-typings/implementations`.
     *
     * @param app - The app instance.
     * @param value - The value.
     * @param sourcePath - The source path.
     * @param display - The display text.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor5__?(app: App, value: string, sourcePath: string, display?: null | string): this;

    /**
     * Resolves the link to its target file.
     *
     * @returns The target file, or `null` if it cannot be resolved.
     * @unofficial
     */
    resolve(): null | TFile;
  }

  namespace LinkValue {
    /**
     * Create a new {@link obsidian#LinkValue} from wikilink syntax.
     *
     * @param app - The app instance.
     * @param input - The wikilink syntax.
     * @param sourcePath - The source path.
     * @returns The new {@link obsidian#LinkValue}.
     *
     * @example
     * ```typescript
     * parseFromString("[[Welcome|Example Link]]")
     * ```
     *
     * @official
     * @since 1.10.0
     * @deprecated - Added only for typing purposes. Use {@link LinkValue.parseFromString} instead.
     */
    function parseFromString__(app: App, input: string, sourcePath: string): LinkValue | null;
  }
}
