import type { getFileValueConstructor } from '../../implementations/constructors/augmentations/values/getFileValueConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * {@link Value} wrapping a file in Obsidian.
   *
   * @since 1.10.0
   */
  interface FileValue extends NotNullValue {
    /**
     * Reference to the app instance.
     *
     * @unofficial
     */
    app: App;

    /**
     * The wrapped file.
     *
     * @unofficial
     */
    file: TFile;

    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getFileValueConstructor} from `obsidian-typings/implementations`.
     *
     * @param app - The app instance.
     * @param file - The file.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor3__(app: App, file: TFile): this;

    /**
     * Gets the backlinks to the file as a list of {@link LinkValue}s.
     *
     * @returns The backlinks.
     * @unofficial
     */
    getBacklinks(): ListValue;

    /**
     * Gets the embeds in the file as a list of {@link LinkValue}s.
     *
     * @returns The embeds.
     * @unofficial
     */
    getEmbeds(): ListValue;

    /**
     * Gets the outgoing links in the file as a list of {@link LinkValue}s.
     *
     * @returns The links.
     * @unofficial
     */
    getLinks(): ListValue;

    /**
     * Gets the file's frontmatter properties.
     *
     * @returns The properties.
     * @unofficial
     */
    getProps(): ObjectValue;

    /**
     * Gets the tags in the file as a list of {@link TagValue}s.
     *
     * @returns The tags.
     * @unofficial
     */
    getTags(): ListValue;

    /**
     * Returns a boolean indicating whether this {@link obsidian#FileValue} is truthy.
     *
     * @returns A boolean indicating whether this {@link obsidian#FileValue} is truthy.
     * @official
     * @since 1.10.0
     */
    isTruthy(): boolean;

    /**
     * String representation of this {@link obsidian#FileValue}.
     *
     * @returns The string representation of this {@link obsidian#FileValue}.
     * @official
     * @since 1.10.0
     */
    toString(): string;
  }
}
