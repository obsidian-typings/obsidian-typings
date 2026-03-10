import type {
  getFileValueConstructor
} from '../../implementations/constructors/augmentations/values/getFileValueConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * {@link Value} wrapping a file in Obsidian.
   *
   * @since 1.10.0
   */
  interface FileValue extends NotNullValue {
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
     * Returns a boolean indicating whether this FileValue is truthy.
     *
     * @returns A boolean indicating whether this FileValue is truthy.
     * @official
     * @since 1.10.0
     */
    isTruthy(): boolean;

    /**
     * String representation of this FileValue.
     *
     * @returns The string representation of this FileValue.
     * @official
     * @since 1.10.0
     */
    toString(): string;
  }
}
