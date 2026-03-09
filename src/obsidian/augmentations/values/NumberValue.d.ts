import type {
  getNumberValueConstructor
} from '../../implementations/constructors/augmentations/getNumberValueConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * {@link Value} wrapping a number.
   *
   * @since 1.10.0
   */
  interface NumberValue extends PrimitiveValue<number> {
    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getNumberValueConstructor} from `obsidian-typings/implementations`.
     *
     * @param value - The value.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor4__(value: number): this;
  }

  namespace NumberValue {
    /**
     * Type.
     *
     * @official
     * @since 1.10.0
     * @deprecated - Added only for typing purposes. Use {@link NumberValue.type} instead.
     */
    var type__: string;
  }
}
