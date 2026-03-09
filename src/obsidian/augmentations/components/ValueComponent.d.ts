import type {
  getValueComponentConstructor
} from '../../implementations/constructors/augmentations/getValueComponentConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * A value component.
   *
   * @typeParam T - The type of the value.
   * @since 0.9.7
   */
  interface ValueComponent<T> extends BaseComponent {
    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getValueComponentConstructor} from `obsidian-typings/implementations`.
     *
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor2__(): this;

    /**
     * Get the value of the component.
     *
     * @returns The value of the component.
     * @official
     * @deprecated - Added only for typing purposes. Use {@link getValue} instead.
     * @since 0.9.7
     */
    getValue__?(): T;

    /**
     * Register an option listener.
     *
     * @param listeners - The listeners to register.
     * @param key - The key of the option.
     * @returns The component.
     * @example
     * ```ts
     * valueComponent.registerOptionListener({
     *     'foo': (value) => {
     *         console.log(value);
     *     }
     * }, 'foo');
     * ```
     * @official
     * @since 0.9.7
     */
    registerOptionListener(listeners: Record<string, (value?: T) => T>, key: string): this;

    /**
     * Set the value of the component.
     *
     * @param value - The value to set.
     * @returns The component.
     * @example
     * ```ts
     * valueComponent.setValue('foo');
     * ```
     * @official
     * @deprecated - Added only for typing purposes. Use {@link setValue} instead.
     * @since 0.9.7
     */
    setValue__(value: T): this;
  }
}
