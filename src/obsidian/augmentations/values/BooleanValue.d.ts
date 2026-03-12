import type { getBooleanValueConstructor } from '../../implementations/constructors/augmentations/values/getBooleanValueConstructor.d.ts';

export {};

declare module 'obsidian' {
  /**
   * {@link Value} wrapping a boolean.
   *
   * @since 1.10.0
   */
  interface BooleanValue extends PrimitiveValue<boolean> {
    /**
     * Constructor.
     *
     * To get the constructor instance, use {@link getBooleanValueConstructor} from `obsidian-typings/implementations`.
     *
     * @param value - The value.
     * @returns The new instance.
     * @unofficial
     * @deprecated - Added only for typing purposes.
     */
    constructor4__(value: boolean): this;
  }

  namespace BooleanValue {
    /**
     * Type.
     *
     * @official
     * @since 1.10.0
     * @deprecated - Added only for typing purposes. Use {@link BooleanValue.type} instead.
     */
    const type__: string;
  }
}
